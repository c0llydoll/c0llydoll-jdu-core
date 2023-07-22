const winston = require("winston");
const utils = require("utils");
const path = require("path");
const fs = require("fs");

module.exports = (service) => {

    const logFolder = path.resolve(__dirname, "../logs", (service));

    const levels = {
        error: 0,
        warn: 1,
        info: 2,
        success: 3,
        http: 4,
        debug: 5,
        cheat: 6
    };
    const COLORS = {
        error: "red",
        warn: "yellow",
        info: "cyan",
        success: "green",
        http: "magenta",
        debug: "white",
        cheat: "redBG"
    };

    fs.mkdirSync(logFolder, { recursive: true }); // Create log folder if it doesn't exist
    winston.addColors(COLORS); // Add colors

    const level = global.gs?.LOG_LEVEL || global.config?.LOG_LEVEL || process.env.LOG_LEVEL || (utils.isDev() ? "debug" : "warn") || "debug";

    const format = winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // Date format
        winston.format.colorize({ all: true }), // All logs must have color
        // Define the format of the message with time, level and message
        winston.format.printf(
            (info) => `${info.timestamp} [${info.level}]: ${info.message}`,
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