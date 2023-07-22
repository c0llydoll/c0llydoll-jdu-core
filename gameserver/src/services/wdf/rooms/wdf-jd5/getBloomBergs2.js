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
            const session = new Session(req.version);
            const scores = new Scores(req.version);

            const count = await session.sessionCount();
            const total = await scores.scoreCount();

            return res.uenc({
                t: utils.serverTime()
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