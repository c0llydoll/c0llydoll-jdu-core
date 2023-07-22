const skusClient = require("../lib/skus-client");

module.exports = (app, public, private, logger) => {

    public.get("/quests", skusClient, async (req, res, next) => {
        var quests = await req.songs.getQuests();

        res.send({
            "__class": "OnlineQuestDb",
            quests
        })
    });

};