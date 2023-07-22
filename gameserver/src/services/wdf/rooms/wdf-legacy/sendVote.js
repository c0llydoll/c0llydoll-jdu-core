const utils = require("wdf-utils")
const time = require("time")

const Playlist = require("wdf-playlist");
const Vote = require("wdf-vote");

module.exports = {
    name: `sendVote`,
    description: ``,
    version: `1.0.0`,

    async init(req, res, next) {

        try {
            const { sid, song_id, vote: votes } = req.body;

            const playlist = new Playlist(req.game.version);
            const vote = new Vote(req.game.version);

            const currentTheme = await playlist.getCurrentTheme();
            const isVote = playlist.isThemeVote(currentTheme);
            if (!isVote)
                return next({
                    status: 400,
                    message: `Current theme is not voting, can't send vote.`
                });

            await vote.registerVote(req.sid, song_id);

            return res.uenc({
                votes,
                song_id
            });
        }
        catch (err) {
            return next({
                status: 500,
                message: `Can't send vote: ${err}`,
                error: err.message
            });
        }
    }
}