/**
 * Provides all basic middlewares for all services.
 */

const uuid = require("uuid");
const utils = require("utils");

const isSuccessful = (status) => status >= 200 && status <= 300;

/**
 * Handles all errors that happen in the server and returns error responses.
 * If server is dev or a special header is given, it will show the error in response.
 * otherwise, message won't show up in prod envs.
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
module.exports.errorHandler = (err, req, res, next) => {
    let data = {};

    data.status = err.status || 400;
    data.success = isSuccessful(data.status);
    data.message = err.message || "Unknown error occured.";
    if (err.error) data.error = err.error;
    
    data.requestId = uuid.v4();
    data.serverTime = new Date();

    global.logger.error({
        path: req.originalUrl,
        ip: req.ip,
        body: JSON.stringify(req.body || {}),
        msg: err.message,
        error: err.error
    });

    // Only show error messages in response if it's true in config and if server is dev
    if (utils.isDev() || req.headers.hasOwnProperty(global.gs.HEADER_DEBUG))
        return res.status(data.status).json(data);
    else
        return res.status(data.status).send();
};

/**
 * All games we support use "WiiDance" user-agent so this helps
 * blocking any request with invalid agent.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
module.exports.agentCheck = (req, res, next) => {
    const userAgent = req.headers["user-agent"];
    const validAgent = global.gs.VALID_USER_AGENT;

    if (utils.isDev()) return next();
    
    if (userAgent !== validAgent) {
        global.logger.warn({
            msg: `${req.ip} tried to access ${req.originalUrl} with invalid agent "${userAgent}"!`,
            headers: req.headers,
            body: req.body
        });
        return res.status(403).send();
    };

    return next();
};

/**
 * 404 helper
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
module.exports.notFound = (req, res, next) => {
    if (utils.isDev()) return next();
    else return res.status(404).send();
};

module.exports.apiAuth = (req, res, next) => {
    const apiKeys = global.secrets.API_KEYS;

    const auth = req.headers[global.gs.HEADER_API_KEY];
    if (!auth || !apiKeys.includes(auth)) 
        return next({
            status: 401,
            message: "Unauthorized"
        });
    
    return next();
};