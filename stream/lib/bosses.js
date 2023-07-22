const contentManager = require("./content-manager");
const utils = require("./utils");

class Bosses {
    constructor() {
    }

    async buildBossDb() {
        var finalBossDb = {};

        const publicationState = utils.isDev() ? "preview" : "live";

        const bosses = await contentManager.fetchBosses(publicationState);

        Object.keys(bosses).forEach(item => {
            var bossData = bosses[item];
            var bossName = bossData["bossId"];

            finalBossDb[bossName] = {
                "__class": "OnlineBoss",
                "bossId": bossName,
                "logo": bossData["logo"],
                "newsFeedPictureUrl": bossData["newsFeedPictureUrl"],
                "packages": {
                    "bossContent": `${bossName}_bossContent`
                }
            };
        })

        return finalBossDb;
    }

    async getBosses() {
        const bossdb = await this.buildBossDb();

        return bossdb;
    }

}

module.exports = new Bosses();
