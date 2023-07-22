const utils = require("utils");

module.exports = {

    name: `BackOffice`,
    description: `Provides back-office data required for admin panels, tools etc.`,
    version: `1.0.0`,

    async init(app, router) {

        router.get("/getConfig", (req, res) => {
            return res.send(
                utils.getConfig()
            );
        });

    }
}