const utils = require("wdf-utils");

const Session = require("wdf-session");
const Scores = require("wdf-score");

/**
 * getServerTime is for the game to sync with the server time
 */
module.exports = {
    name: `getServerTime`,
    description: ``,
    version: `1.0.0`,

    async init(req, res, next) {
        try {
            const session = new Session(req.version, req.ip);
            const scores = new Scores(req.version, req.ip);

            const count = await session.sessionCount();
            const total = await scores.scoreCount();

            return res.uenc({
                count,
                total,
                t: utils.serverTime(),
                
                last_song_unlocked: global.config.LOCKED.lastSong,
                next_unlocked_song_id: global.config.LOCKED.nextSong,

                current_star_count: await scores.getStarCount(),
                star_count_for_unlock: global.config.LOCKED.starCountToUnlock,

                happyhour: utils.serverTime(global.config.HAPPYHOUR.time),
                happyhour_duration: global.config.HAPPYHOUR.duration,
            });
        }
        catch (err) {
            return next({
                status: 500,
                message: `Can't get stats: ${err}`,
                error: err.message
            });
        }
    }
}