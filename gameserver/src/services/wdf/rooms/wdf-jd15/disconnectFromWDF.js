const utils = require("utils");
const Session = require("wdf-session");

module.exports = {

    name: `disconnectFromWDF`,
    description: `Disconnects user from WDF, removing their session and from their lobby`,
    version: `1.0.0`,

    async init(req, res, next) {

        try {
            // We wont use sid from body can be used for hijacking
            // TODO: would it be ok to detect if sid and token sid doesnt match and ban player? (means they are hijacking)
            const { sid } = req.body;

            const session = new Session(2015, req.ip);
            const sessionId = req.sid;

            const userCache = await session.getSessionCache(sessionId);

            await session.deleteSession(sid);

            global.logger.success(`${userCache.userId} disconnected from WDF of 2015!`);

            return res.uenc();
        }
        catch (err) {
            return next({
                status: 500,
                message: `Can't disconnect user from WDF: ${err}`,
                error: err.message
            });
        }
    }
}