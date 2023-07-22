const contentManager = require("./content-manager");
const utils = require("./utils");

class Items {
    constructor() {
    }

    async buildAvatarDb() {
        var finalAvatarDb = {};

        const publicationState = utils.isDev() ? "preview" : "live";

        const avatars = await contentManager.fetchAvatars(publicationState);

        Object.keys(avatars).forEach(item => {
            var id = item;
            var avatarData = avatars[item];

            finalAvatarDb[id] = {
                "__class": "OnlineCustomizableItem",
                "Id": parseInt(id),
                "JDNowVersion": avatarData["jdVersion"],
                "jdVersion": avatarData["jdVersion"],
                "mojoPrice": avatarData["mojoPrice"],
                "relativeQuestID": avatarData["relativeQuestID"],
                "relativeSongName": avatarData["relativeSongName"],
                "relativeWDFBossName": avatarData["relativeWDFBossName"],
                "soundFamily": avatarData["soundFamily"],
                "status": 1,
                "unlockType": avatarData["unlockType"],
                "url": avatarData["url"],
                "itemType": 0,
                "visibility": 1
            };
        })

        return finalAvatarDb;
    }

    async getAvatars() {
        const avatardb = await this.buildAvatarDb();

        return avatardb;
    }

    async buildSkinDb() {
        var finalSkinDb = {};

        const publicationState = utils.isDev() ? "preview" : "live";

        const skins = await contentManager.fetchSkins(publicationState);

        Object.keys(skins).forEach(item => {
            var id = item;
            var skinData = skins[item];

            finalSkinDb[id] = {
                "__class": "OnlineCustomizableItem",
                "jdVersion": skinData["jdVersion"],
                "mojoPrice": skinData["mojoPrice"],
                "status": 3,
                "unlockType": skinData["unlockType"],
                "url": skinData["url"],
                "itemType": 1
            };
        })

        return finalSkinDb;
    }

    async getSkins() {
        const skindb = await this.buildSkinDb();

        return skindb;
    }
}

module.exports = new Items();
