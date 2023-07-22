const utils = require("wdf-utils")
const time = require("time")

const Playlist = require("wdf-playlist");
const Session = require("wdf-session");
const Vote = require("wdf-vote");

module.exports = {

    name: `checkToken`,
    description: ``,
    version: `1.0.0`,

    async init(req, res, /* next */) {

        try {
            const { lang } = req.body;

            const playlist = new Playlist(2015);
            const session = new Session(2015);
            const vote = new Vote(2015);

            const durations = playlist.durations;

            const { prev, cur, next } = await playlist.getScreens();

            const count = await session.sessionCount();
            const voteResults = await vote.getResults();

            const now = time.milliseconds();

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
                session_recap_time: durations.session_result_duration / 1000, // Duration of lobby/party recap time

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

            // If current screen is vote, setup few stuff
            if (playlist.isThemeVote(cur.theme.id)) {
                // Set vote choices
                let choices = cur.voteChoices;
                choices.forEach((c, i) => {
                    const songId = c.songId;
                    if (voteResults && voteResults[songId])
                        voteData[`vote${i + 1}`] = voteResults[songId] * 100;
                    voteData[`vote${i + 1}_song`] = songId;
                });
                voteData.votenumresult = choices.length;
            }

            // If next screen is vote, setup few stuff
            if (playlist.isThemeVote(next.theme.id)) {

                voteData.votenumchoices = next.voteChoices.length

                // Set next choices
                let choices = next.voteChoices;
                choices.forEach((c, i) => {
                    voteData[`next${i + 1}`] = c.songId;
                });
            }

            let playlistData = {
                ...modeData,
                ...timingData,
                ...voteData,

                unique_song_id: cur.map.songId,
                nextsong: next.map.songId,

                requestPlaylistTime: cur.timing.request_playlist_time,
                interlude: "yes"
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
            ["start", "end", "requestPlaylistTime", "vote_end"].forEach(t => {
                playlistData[t] = utils.serverTime(playlistData[t]);
            });

            return res.uenc({
                ...playlistData,
                count,
                t: utils.serverTime(now)
            });
        }
        catch (err) {
            return next({
                status: 500,
                message: `Can't get playlist: ${err}`,
                error: err.message
            });
        }
    }
}