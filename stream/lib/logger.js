const winston = require("winston");
const path = require("node:path");
const fs = require("node:fs");

const utils = require("./utils");

/**
 * Creates a logger with given service name
 * @param {String} service 
 * @returns 
 */
module.exports.createLogger = ({ service }) => {
    if (!service) throw new Error(`A service name is required in order to create a logger.`)

    const logFolder = path.resolve(global.root, "logs", service);
    // Create log folder if it doesn't exist
    fs.mkdirSync(logFolder, { recursive: true });

    const levels = {
        error: 0,
        warn: 1,
        info: 2,
        success: 3,
        http: 4,
        cheat: 5,
        debug: 6
    };
    const colors = {
        error: "red",
        warn: "yellow",
        info: "cyan",
        success: "green",
        http: "magenta",
        cheat: "redBG",
        debug: "white"
    };

    winston.addColors(colors);

    const level = global.config?.LOG_LEVEL || process.env.LOG_LEVEL || utils.isDev() ? "debug" : "info";

    const format = winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // Date format
        winston.format.colorize({ all: true }), // All logs must have color
        // Define the format of the message with time, level and message
        winston.format.printf(
            (info) => `${info.timestamp} [${info.level}] [${service}]: ${info.message}`,
        ),
    );

    const transports = [
        // Allow the use the console to print the messages
        new winston.transports.Console(),
        // Allow to write logs to file
        new winston.transports.File({
            filename: `${logFolder}/error.log`,
            level: "error",
        }, {
            filename: `${logFolder}/warn.log`,
            level: "warn",
        }, {
            filename: `${logFolder}/info.log`,
            level: "info",
        }, {
            filename: `${logFolder}/debug.log`,
            level: "debug",
        }, {
            filename: `${logFolder}/cheat.log`,
            level: "cheat",
        }, {
            filename: `${logFolder}/http.log`,
            level: "http",
        }),
        new winston.transports.File({ filename: `${logFolder}/all.log` })
    ];

    const logger = winston.createLogger({
        level,
        levels,
        format,
        transports
    });

    return logger;
};