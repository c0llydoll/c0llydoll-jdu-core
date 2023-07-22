const appsClient = require("../lib/apps-client");

module.exports = (app, public, private) => {
    public.get("/me/friends", async (req, res, next) => {
        return res.send({
            friends: []
        })
    });

    public.post("/:profileId/events", async (req, res, next) => {
        return res.send({})
    });
};