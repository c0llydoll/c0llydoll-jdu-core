module.exports = (app, public, private, logger) => {

    private.get("/config", (req, res) => {
        const config = global.config;
        delete config.SECRETS;
        return res.send({
            config,
            locLanguages: global.languages
        });
    });

    private.get("/locs", (req, res) => {
        return res.send({
            locs: global.locs,
            languages: global.languages
        });
    });

};