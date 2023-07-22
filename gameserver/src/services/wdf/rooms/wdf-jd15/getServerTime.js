const utils = require("wdf-utils");
const Session = require("wdf-session");

module.exports = {
    name: `getServerTime`,
    description: ``,
    version: `1.0.0`,

    async init(req, res, next) {

        try {
            const { sid, token } = req.body;

            // If "sid" and "token" is provided, it means client has left party and went to pre wdf
            // so we should remove their session & remove from lobby
            if (sid) {
                const session = new Session(2015, req.ip);
                const sessionId = sid;

                const userSession = await session.getSession(sessionId);
                const userCache = await session.getSessionCache(sessionId, req.ip);
                if (!userCache) {
                    return next({
                        status: 400,
                        message: "Session does not exist!"
                    });
                };

                if (userSession) {
                    await session.deleteSession(sessionId);
                    global.logger.info("Deleted session of " + sessionId);
                };
            }

            return res.uenc({
                t: utils.serverTime(),
                sendscore_interval: global.config.DURATIONS.send_stars_delay / 1000
            });
        }
        catch (err) {
            return next({
                status: 500,
                message: `Can't get server time: ${err}`,
                error: err.message
            });
        }
    }
}