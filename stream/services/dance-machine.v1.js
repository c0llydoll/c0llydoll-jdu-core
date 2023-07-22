module.exports = (app, public, private, logger) => {

    public.get("/blocks", (req, res) => {
        return res.send({
            __class: "OnlineBlockDb",
            blocks: {}
        });
    });

};