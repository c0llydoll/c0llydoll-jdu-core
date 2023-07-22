const Session = require("wdf-session");
const cache = require("cache");

module.exports = {
    name: `checkToken`,
    description: `Verifies player's token and checks if they can connect online.`,
    version: `1.0.1`,
    async init(req, res, next) {
        try {
            const session = new Session(req.game.version);

            const canConnect = await session.canUserConnect(req.uid);
            if (!canConnect) {
                global.logger.info(`${req.uid} with ${req.game.id} received 401 from checkToken!`)
                return next({
                    status: 401,
                    message: `User is not allowed to create connection to WDF!`
                });
            }

            return res.uenc();
        }
        catch (err) {
            return next({
                status: 500,
                message: `Can't verify token: ${err}`,
                error: err.message
            });
        }
    }
}