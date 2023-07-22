module.exports = (app, public, private, logger) => {

    public.get("/aliases", (req, res) => {
        res.send({
            __class: "OnlineAliasDb",
            aliases: {}
        })
    })

};