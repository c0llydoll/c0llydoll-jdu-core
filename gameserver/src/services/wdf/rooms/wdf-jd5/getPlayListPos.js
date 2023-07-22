const utils = require("wdf-utils")
const time = require("time")

const Playlist = require("wdf-playlist");
const Session = require("wdf-session");
const Score = require("wdf-score");

/**
 * getPlayListPos is for the game to be in sync with the current WDF playlist
 */
module.exports = {

    name: `getPlayListPos`,
    description: ``,
    version: `1.0.0`,

    async init(req, res, _next) {

        try {
            const { lang } = req.body;

            const now = time.milliseconds();

            const playlist = new Playlist(req.version);
            const session = new Session(req.version);
            const scores = new Score(req.version);

            const durations = playlist.durations;

            const { prev, cur, next } = await playlist.getScreens();

            const count = await session.sessionCount();

            let pos = (now - cur.timing.start_song_time) / 1000; // "pos" indicates the position of the playlist
            let left = (cur.timing.stop_song_time - now) / 1000; // "left" shows how many seconds are left until a map ends

            let modeData = {
                mode: cur.theme.id,
                nextmode: next.theme.id,
            };

            let timingData = {
                start: cur.timing.start_song_time,
                end: cur.timing.stop_song_time,

                pos,
                left,

                sessionToWorldResultTime: durations.world_result_duration / 1000, // Duration from map end till world result screen
                display_next_song_time: durations.display_next_song_duration / 1000, // The duration of "next song" popup on right side

                // Theme durations
                theme_choice_duration: 0,
                theme_result_duration: 0,
                coach_choice_duration: 0,
                coach_result_duration: 0,

                rankwait: durations.waiting_recap_duration / 1000 // Duration of waiting for recap results
            };

            let voteData = {
                vote1: 0,
                vote2: 0,
                vote3: 0,
                vote4: 0,
                votenumresult: 0,
                vote1_song: 0,
                vote2_song: 0,
                vote3_song: 0,
                vote4_song: 0,
                votenumchoices: 0,
                vote_end: cur.timing.last_vote_time,
                next1: 0,
                next2: 0,
                next3: 0,
                next4: 0
            };

            let playlistData = {
                ...modeData,
                ...timingData,
                ...voteData,

                unique_song_id: cur.map.songId,
                nextsong: next.map.songId,

                requestPlaylistTime: cur.timing.request_playlist_time,
                interlude: "yes",

                // Locked songs
                last_song_unlocked: global.config.LOCKED.lastSong,
                next_unlocked_song_id: global.config.LOCKED.nextSong,

                current_star_count: await scores.getStarCount(),
                star_count_for_unlock: global.config.LOCKED.starCountToUnlock,

                happyhour: utils.serverTime(global.config.HAPPYHOUR.time),
                happyhour_duration: global.config.HAPPYHOUR.duration
            };

            // Depending on theme type, set extra information.
            switch (cur.theme.id) {
                case 1:
                    playlistData.community1name = cur.theme.communities[0];
                    playlistData.community2name = cur.theme.communities[1];
                    playlistData.theme_choice_duration = durations.community_choice_duration / 1000;
                    playlistData.theme_result_duration = durations.community_result_duration / 1000;
                    break;
                case 2:
                    break;
                case 3:
                    playlistData.coach_choice_duration = durations.coach_choice_duration / 1000;
                    playlistData.coach_result_duration = durations.coach_result_duration / 1000;
                    break;
            }

            // Times to parse
            ["start", "end", "requestPlaylistTime", "vote_end", "happyhour"].forEach(t => {
                playlistData[t] = utils.serverTime(playlistData[t]);
            });

            return res.uenc({
                ...playlistData,
                count,
                t: utils.serverTime(now)
            });
        }
        catch (err) {
            return _next({
                status: 500,
                message: `Can't get playlist: ${err}`,
                error: err.message
            });

        }
    }
};