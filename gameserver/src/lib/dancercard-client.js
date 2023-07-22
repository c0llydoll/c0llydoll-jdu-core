const dancercard = require("dancercard");

/**
 * Appends client's Dancercard to request
 */
module.exports = async (req, res, next) => {
    if (!req.uid)
        return next({
            status: 401,
            message: `UserId required for Dancercard client!`
        });

    let profile = await dancercard.get({ userId: req.uid });
    if (!profile)
        return next({
            status: 401,
            message: `Client does not have a profile!`
        });

    req.profile = profile;
    req.pid = profile.profileId;
    return next();
}