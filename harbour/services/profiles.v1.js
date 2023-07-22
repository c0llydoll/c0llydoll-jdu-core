const appsClient = require("../lib/apps-client");

module.exports = (app, public, private) => {

    public.get("/me/populations", async (req, res, next) => {
        return res.send({
            populations: []
        });
    });

    public.get("/:profileId/actions", async (req, res, next) => {
        return res.send({
            actions: require("../data/applications/Just Dance 2017 PC/actions")
        });
    });

    public.get("/:profileId/rewards", async (req, res, next) => {
        return res.send({
            rewards: require("../data/applications/Just Dance 2017 PC/rewards")
        });
    });
};