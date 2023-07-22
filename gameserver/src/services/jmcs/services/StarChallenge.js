const nas = require("nas-token-client");

module.exports = {

    name: `StarChallenge`,
    description: `Provides all Mash-Up data such as online maps and metadata.`,
    version: `1.0.0`,

    async init(app, router) {

        router.post("/getCommonData", nas.require, (req, res) => {
            return res.send("");
            const commonData = {
                avatar: 0,
                country: 0,
                id: 0,
                name: 0,
                tagline: 0,
                intro_image: 0,
                outro_image: 0,
                cover_image: 0,
                description: 0,
                intro_text: 0,
                outro_text: 0
            }
            return res.uenc(commonData)
        });
        
    }
};