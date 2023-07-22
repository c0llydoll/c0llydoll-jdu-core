const utils = require("./utils");
const morganMiddleware = require("./morgan-middleware");
const uuid = require("uuid");

/**
 * Returns if given status was successful or not
 * @param {Number} status 
 * @returns 
 */
const isSuccessful = (status) => status > 200 && status < 400;

/**
 * Used when server starts, loads all necessary middlewares
 * @param {*} app 
 * @param {*} logger 
 */
module.exports.init = (app, logger) => {
    app.set("etag", false);
    app.set("x-powered-by", false);
    app.set("trust proxy", "loopback");
    app.use(morganMiddleware(logger))
};

/**
 * Handles 404
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
module.exports.notFound = (req, res, next) => {
    return res.status(404).send();
};

/**
 * Handles server errors and returns as a response
 * If we are not in a dev environment, it won"t show error in response.
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
module.exports.errorHandler = (err, req, res, next) => {
    
    const status = (err.status || 500);
    const response = {
        status,
        message: err.message,
        error: err.error,
        errorMessage: err.error?.message,
        isSuccessful: isSuccessful(status),
        serverTime: new Date(),
        requestId: uuid.v4()
    };

    // Only send error in response if we are in a dev environment
    if (utils.isDev())
        return res.status(status).send(response);
    else
        return res.status(status).send();
};