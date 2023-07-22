module.exports = (app, public, private, logger) => {

    public.get("/", (req, res) => {
        res.send({
            __class: "SessionQuestService::QuestData",
            newReleases: []
        })
    })

};