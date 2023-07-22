const cache = require("cache");
const utils = require("utils");
const games = require("games");
const songs = require("songs");
const time = require("time");
const scheduler = require("scheduler");

const Vote = require("wdf-vote");

const PREV = "prev";
const CUR = "cur";
const NEXT = "next";

class Playlist {
    constructor(version) {
        this.version = version;
        if (!games.isGameAvailable(this.version))
            throw new Error(`${version} is not available for use!`);
        
        this.communities = global.config.COMMUNITIES;
        this.durations = global.config.DURATIONS;
        this.themes = global.config.THEMES;
        this.keys = {
            prev: `playlist:${this.version}:${PREV}`,
            cur: `playlist:${this.version}:${CUR}`,
            next: `playlist:${this.version}:${NEXT}`,
            history: `playlist:${this.version}:history`
        };
        this.vote = new Vote(this.version);
        this.game = games.getGameByVersion(this.version);
    }

    randomTheme(exclude = []) {
        let themes = this.themes.filter(t => !exclude.includes(t.id) && t.isAvailable);
        return utils.random(themes);
    }

    randomCommunity(exclude = []) {
        let list = this.communities.list;
        let locs = this.communities.locs;

        // Get a random theme from list
        let random = utils.random(list);
        if (!random) random = utils.random(list);

        const [ theme0, theme1 ] = random;
        return [theme0["en"], theme1["en"]];
    }

    async randomMap(amount = 1, mapsToExclude = [], filter = {}) {
        const result = await songs.random(this.version, amount, mapsToExclude, filter);
        return result[0] ? result[0] : null;
    }

    async getCurrentTheme() {
        const { cur } = await this.getScreens();
        if (!cur) return null;
        return cur.theme.id;
    }

    async getStatus() {
        const now = time.milliseconds();
        const { prev, cur, next } = await this.getScreens();
        const currentTheme = cur.theme.id;

        const isCommunity = this.isThemeCommunity(currentTheme);
        const isVote = this.isThemeVote(currentTheme);
        const isCoach = this.isThemeCoach(currentTheme);

        const isSong = now > cur.timing.start_song_time && now < cur.timing.stop_song_time;
        const isRecap = now > cur.timing.recap_start_time && now < cur.timing.request_unlock_time;
        const isPreSong = (now >= cur.timing.base_time && now <= cur.timing.start_song_time) ? true : (!isRecap && !isSong);
        
        return { currentTheme, isSong, isRecap, isPreSong, isCommunity, isVote, isCoach, prev, cur, next };
    }

    async getHistory() {
        const history = await cache.get(this.keys.history);
        if (!history) return [];
        return history;
    }

    async updateHistory(map) {
        const mapName = map.mapName;
        const history = await cache.get(this.keys.history);
        // History doesn't exist? Create an empty one
        if (!history) {
            const newHistory = [];
            newHistory.unshift(mapName);
            await cache.set(this.keys.history, newHistory);
            return;
        }
        else {
            if (!history.includes(mapName))
                history.unshift(mapName);
            await cache.set(this.keys.history, history.slice(0, global.gs.PLAYLIST_HISTORY_SIZE));
        }
    }

    async resetHistory() {
        await cache.set(this.keys.history, []);
    }

    /**
     * Get current playlist screens
     * @param {Boolean} update If true, returns playlist without any creation/check
     * @returns Playlist data
     */
    async getScreens(update = true) {
        const now = time.milliseconds();
        let playlist = {
            prev: await cache.get(this.keys.prev),
            cur: await cache.get(this.keys.cur),
            next: await cache.get(this.keys.next)
        };
        if (!update) return playlist;

        // If server has slept, this will reset cur and next so that they can be created again
        const isCurSlept = (
            (playlist.cur && now > playlist.cur.timing.request_playlist_time + 5000)
        );
        const isNextSlept = (
            playlist.next && 
            (now > playlist.next.timing.base_time) && 
            (now > playlist.next.timing.start_song_time || now > playlist.next.timing.request_playlist_time)
        );
        if (isCurSlept || isNextSlept) {
            console.log(isCurSlept, isNextSlept)
            global.logger.info(`Server was slept, rotating playlist for ${this.version}...`)
            await this.rotateScreens(true);
            return await this.getScreens(false);
        }
        
        if (!playlist.cur) {
            const data = await cache.set(this.keys.cur, await this.createScreen(CUR));
            playlist.cur = data;
            global.logger.info("CREATED CURRENT " + JSON.stringify(playlist.cur))
        };
    
        if (!playlist.next) {
            const data = await cache.set(this.keys.next, await this.createScreen(NEXT));
            playlist.next = data;
            global.logger.info("CREATED NEXT " + JSON.stringify(playlist.next))
        };
    
        return playlist;
    }

    isScreenSlept(screen) {
        const now = time.milliseconds();
        const { timing } = screen;
        const { request_playlist_time, base_time } = timing;
        // If now passed base time and request playlist time, screen was slept.
        if (now > base_time && now > request_playlist_time) return true;
        else return false;
    }

    async rotateScreens(isOffSync = false) {
        const now = time.milliseconds();
        const prev = await cache.get(this.keys.prev);
        const cur = await cache.get(this.keys.cur);
        let next = await cache.get(this.keys.next);

        // Before syncing, make sure to cancel next's scheduled rotation & reset score
        // because there is a bug where if we sync next, playlist will go fine
        // and in middle of the song, the playlist will rotate because of the schedule
        next.jobs.forEach(job => {
            scheduler.cancelJob(job)
        });
        // Compute next's timing and sync it to "now"
        next = this.syncScreen(next, now);
        // Re-schedule "next" after deleting its off-sync rotation job
        jobs = this.scheduleScreen(next);
        next.jobs = jobs;

        // Create a new next with the base time from next 
        // (we pass "next" as argument to make sure it's in sync)
        const newScreen = await this.createScreen(NEXT, next);

        global.logger.info({
            msg: `Rotated screens for ${this.version}: ${now}`,
            prev: cur.map.mapName,
            cur: next.map.mapName,
            next: newScreen.map.mapName
        });
        
        if (utils.isDev()) {
            require("fs").writeFileSync("./playlist-data/" + now + ".json", JSON.stringify({
                prev: cur,
                cur: next,
                next: newScreen
            }, null, 2));
        }

        await cache.set(this.keys.prev, cur);
        await cache.set(this.keys.cur, next);
        await cache.set(this.keys.next, newScreen);
    }

    /**
     * Syncs given screen to current time. 
     * If given screen was 10 minutes ago, this will sync it to now.
     * @param {*} type 
     * @param {*} screen 
     * @returns 
     */
    syncScreen(screen, now = time.milliseconds()) {
        const base = now;
        const diff = base - screen.timing.base_time;
      
        Object.keys(screen.timing).forEach(k => {
          let time = screen.timing[k];
          let difference = diff - (base - time);
          time = base + difference;
          screen.timing[k] = time;
        });
        return screen;
    }

    scheduleScreen(screen) {
        const rotationTime = screen.timing.request_playlist_time - 5000;
        const resetScoreTime = rotationTime;

        const { rotateScreens, resetScores } = this.getRotationDefinition(screen);

        // Rotate playlist and clear votes
        scheduler.newJob(rotateScreens, rotationTime, async () => {
            global.logger.info(`Rotating playlist of ${this.version}...`)
            await this.rotateScreens();
            // this.vote.resetVotes();
        });

        // Clear all scores for version
        scheduler.newJob(resetScores, resetScoreTime, async () => {
            const db = require("./models/wdf-score");
            const { deletedCount } = await db.deleteMany({ "game.version": this.version });
            global.logger.info(`Erased ${deletedCount} scores from ${this.version} after rotation`)
        });

        return [rotateScreens, resetScores];
    };

    getFilterForTheme(themeId) {
        if (this.isThemeCoach(themeId))
            return { numCoach: { $gt: 1 } };
        else return {};
    }

    async createScreen(type, prevScreen) {
        const { prev, cur, next } = await this.getScreens(false);

        const now = time.milliseconds();
        const init = (!prev && !cur && !next);
        const history = await this.getHistory();

        let baseTime = 0;
        let screen = {};

        let ignoredThemes = [];
        let ignoredSongs = [...history];
        let ignoredCommunities = [];

        let voteCandidates = [];

        let prevThemeId;

        // First screen
        if (init) {
            prevThemeId = -1;
            baseTime = now;
            // First screen should never be vote!
            ignoredThemes.push(2);
        }
        else {
            prevThemeId = cur.theme.id;
            baseTime = cur.timing.world_result_stop_time;

            // If a previous screen was provided (probably for syncing) set base time from it
            if (prevScreen)
                baseTime = prevScreen.timing.world_result_stop_time;

            // Always ignore previous and current's map
            ignoredSongs.push(prev?.map.mapName, cur?.map.mapName);
            ignoredThemes.push();

            // Was previous screen vote? Set the vote winner as map.
            const isVote = this.isThemeVote(prevThemeId);
            if (isVote) {
                const candidates = cur.candidates;
                const candidateCount = candidates.length;
                baseTime = 0; // set to request playlist time
                // TODO
            };
        };

        // Create theme & map
        const theme = this.randomTheme(ignoredThemes);
        const map = await this.randomMap(1, ignoredSongs, this.getFilterForTheme(theme.id));
        if (!map)
            throw new Error(`Playlist couldn't find a map to create screen for ${this.game.version}, is the song database empty?`);

        screen.theme = theme;
        screen.map = map;

        // If theme is community, pick out 2 communities
        if (this.isThemeCommunity(theme.id)) {
            let randomTheme = this.randomCommunity();
            screen.theme.communities = [randomTheme[0], randomTheme[1]];
        }
        // If theme is voting, pick out 2-4 random candidates
        else if (this.isThemeVote(theme.id)) {
            let choiceAmount = utils.randomNumber(2, 4);
            // Don't make any map from prev cur and next as vote option
            let choices = await this.randomMap(choiceAmount, [
                prev?.map.mapName, cur?.map.mapName, next?.map.mapName
            ]);
            screen.theme.candidates = choices;
            global.logger.info(`Generated following maps for vote screen: ${choices.map(m => m.mapName)}`)
        };

        // Make sure that the baseTime is bigger than the current epoch 
        // (can happen if the server sleeps for a while)
        if (baseTime < now)
            baseTime = now;
        
        let { timing, timingProgramming } = this.calculateTime(baseTime, screen, !init);
        screen.timing = timing;
        screen.timingProgramming = timingProgramming;

        // Schedule the next rotation
        const jobs = this.scheduleScreen(screen);
        screen.jobs = jobs;
        
        // Update history for no repetation!
        await this.updateHistory(map);
        return screen;
    }

    getRotationDefinition(screen) {
        const { mapName } = screen.map;
        const { request_playlist_time } = screen.timing;
        return {
            rotateScreens: `rotate-playlist:${mapName}:${request_playlist_time}`,
            resetScores: `reset-scores:${mapName}:${request_playlist_time}`,
        }
    }

    async resetScreens() {
        await cache.set(this.keys.prev, null);
        await cache.set(this.keys.cur, null);
        await cache.set(this.keys.next, null);
        return;
    }

    calculateTime(baseTime, screen, isNext) {

        let durations = this.durations;
        let themeType = screen.theme.id;
        let mapLength = parseInt(screen.map.length);

        // Pre-song 
        let presentation_start_time = baseTime + this.computePreSongDuration(themeType);
        let start_song_time = presentation_start_time + durations["presentation_duration"];

        // Post-song
        let stop_song_time = start_song_time + mapLength;
        stop_song_time = Number((stop_song_time).toFixed(3));
        
        let recap_start_time = stop_song_time + durations["waiting_recap_duration"];

        let session_result_start_time = recap_start_time + this.computeThemeResultDuration(themeType);

        let session_to_world_result_time = session_result_start_time + durations["session_result_duration"];
        if (this.game.isJD5) session_to_world_result_time = session_result_start_time;

        let world_result_stop_time = session_to_world_result_time + durations["world_result_duration"];
            
        let merge_computation_time = session_to_world_result_time + durations["world_result_duration"] / 4;
        let merge_computation_duration_in_ms = durations["world_result_duration"] / 2;

        let playlist_computation_time;
        let last_vote_time;
        let pre_compute_time;
        let second_request_playlist_time;

        if (isNext && this.isThemeVote(themeType)) {
            last_vote_time = world_result_stop_time + durations["vote_choice_duration"];
            playlist_computation_time = last_vote_time + durations["vote_computation_delay"];
            pre_compute_time = world_result_stop_time - durations["playlist_request_delay"] - durations["playlist_computation_delay"];
            second_request_playlist_time = last_vote_time + durations["vote_computation_delay"] + durations["playlist_computation_delay"];
        }
        else {
            if (isNext && this.isThemeStarChallenge(themeType)) {
                last_vote_time = world_result_stop_time + durations["star_challenge_intro_duration"];
            }
            else {
                // last_vote_time should not be used, but we put a valid time to keep the same chronolo order.
                last_vote_time = world_result_stop_time;
                playlist_computation_time = world_result_stop_time - durations["playlist_request_delay"] - durations["playlist_computation_delay"];
            };
        };

        let request_playlist_time = world_result_stop_time // - durations["playlist_request_delay"];
        
        let unlock_computation_time = stop_song_time + durations["send_stars_delay"];
        let request_unlock_time = unlock_computation_time + durations["unlock_computation_delay"];

        let timing = {
            base_time: baseTime,
            presentation_start_time, 
            start_song_time, 
            stop_song_time,
            recap_start_time, 
            session_result_start_time, 
            session_to_world_result_time, 
            world_result_stop_time, 
            last_vote_time, 
            request_unlock_time, 
            playlist_computation_time, 
            request_playlist_time,
            merge_computation_time,
            merge_computation_duration_in_ms
        };

        let next_new_step_time = 0;

        if (isNext && this.isThemeVote(themeType)) 
            next_new_step_time = request_playlist_time;
        else
            next_new_step_time = world_result_stop_time;
        
        let next_presentation_start_time = next_new_step_time + this.computePreSongDuration(themeType)
        let next_start_song_time = next_presentation_start_time + durations["presentation_duration"]
        let timingProgramming = {
          "request_playlist_time": request_playlist_time, 
          "next_start_song_time": next_start_song_time
        }

        return {
            timing, timingProgramming
        };
    }

    computePreSongDuration(themeType, durations = this.durations) {
        if (this.isThemeVote(themeType))
            return durations["vote_result_duration"]
        else if (this.isThemeCommunity(themeType)) {
            return durations["community_choice_duration"]
        }
        else if (this.isThemeCoach(themeType)) {
            return durations["coach_choice_duration"]
        }
        else if (this.isThemeStarChallenge(themeType)) {
            return durations["star_challenge_intro_duration"]
        }
        else return 0
    }

    computeThemeResultDuration(themeType, durations = this.durations) {
        if (this.isThemeAutodance(themeType))
            return durations["autodance_result_duration"]
        else if (this.isThemeCommunity(themeType)) {
            return durations["community_result_duration"]
        }
        else if (this.isThemeCoach(themeType)) {
            return durations["coach_result_duration"]
        }
        else if (this.isThemeStarChallenge(themeType)) {
            return durations["star_challenge_outro_duration"]
        }
        else return 0
    }

    isThemeAutodance = (id) => id == 0;
    isThemeCommunity = (id) => id == 1;
    isThemeVote = (id) => id == 2;
    isThemeCoach = (id) => id == 3;
    isThemeStarChallenge = (id) => id == 4;
}

module.exports = Playlist;
