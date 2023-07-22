const apps = require("../lib/apps");
const appsClient = require("../lib/apps-client");
const ticketClient = require("../lib/harbour-ticket-client");

module.exports = (app, public, private) => {
    
    public.get("/:appId/configuration", ticketClient.require, appsClient.auth, appsClient.param, async (req, res, next) => {

        const appId = req.params.appId;
        if (!apps.isAppAvailable(appId)) return next({
            status: 400,
            message: `${appId} is not an existing app.`
        });
        const configuration = apps.getConfiguration(appId);
        return res.send({ configuration })
    });
};