const apps = require("./apps");

module.exports.permit = (appId, next) => {
    if (!apps.isAppAvailable(appId)) return next({
        status: 400,
        message: `'${appId}' either does not exist or it's not available.`
    });
    const app = apps.getApp(appId);
    return next(null, app);
};

module.exports.param = (req, res, next) => {
    const appId = req.params.appId;
    if (!appId) return next({
        status: 400,
        message: `Application ID cannot be empty!`
    });
    this.permit(appId, (err, app) => {
        if (err) return next(err);

        req.app = app;
        req.appId = app.applicationId;
        req.spaceId = app.spaceId;

        return next();
    });
};

module.exports.auth = (req, res, next) => {
    const appId = req.headers["ubi-appid"];
    if (!appId) return next({
        status: 400,
        message: `App ID is required!`
    });
    this.permit(appId, (err, app) => {
        if (err) return next(err);

        req.app = app;
        req.appId = app.applicationId;
        req.spaceId = app.spaceId;

        return next();
    });
};