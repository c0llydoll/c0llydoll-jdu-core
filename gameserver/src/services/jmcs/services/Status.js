const utils = require("utils");
const nas = require("nas-token-client");

module.exports = {

    name: `BackOffice`,
    description: `Provides back-office data required for admin panels, tools etc.`,
    version: `1.0.0`,

    async init(app, router) {

        router.get("/health", utils.healthCheck);

        router.get("/getStatus", (req, res) => {
            return res.json({
                service: global.service.name,
                gameserver: {
                    version: global.project.version
                },
                enviroment: global.ENV
            });
        });

    }
}