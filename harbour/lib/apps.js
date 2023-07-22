const path = require("node:path");

class Apps {
    constructor() {
        this.apps = require("../data/apps");
    };

    getApps() {
        return this.apps;
    };
    getApp(appId) {
        return this.apps.find(a => a.applicationId === appId);
    };
    isAppAvailable(appId) {
        const app = this.getApp(appId);
        if (!app) return false;
        return true;
    };

    getAppFolder(appId) {
        const app = this.getApp(appId);
        const appFolder = path.resolve(global.root, "data/applications", app.name);
        return appFolder;
    };
    
    getConfiguration(appId) {
        const app = this.getApp(appId);
        const gatewayResources = require("../data/gateway-resources");
        const uplayServices = require("../data/uplay-services");
        const configPath = path.resolve(this.getAppFolder(appId), "configuration.js");
        const config = require(configPath);
        return {
            platformConfig: {
                applicationId: app.applicationId,
                spaceId: app.spaceId,
                platform: app.platform,
                uplayGameCode: app.uplayGameCode,
                environment: "Prod"
            },
            gatewayResources,
            uplayServices,
            ...config
        };
    };

    getParameters(appId) {};
};

module.exports = new Apps();