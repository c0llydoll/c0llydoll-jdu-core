const nas = require("nas-token-client");

module.exports = {

    name: `ConstantProvider`,
    description: `Provides all constant data needed for the game's online services.`,
    version: `1.0.0`,

    async init(app, router) {

        /**
         * getConstants is used by the game to set JDWall configuration
         */
        router.post("/getConstants", nas.require, (req, res) => {
            return res.json(global.config.CONSTANTS);
        });

    }
}