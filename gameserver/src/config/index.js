/**
 * Base configuration for Gameserver.
 * These configs are used by all services.
 */

module.exports.BASE_URL = process.env.BASE_URL || "http://localhost:" + global.PORT;
module.exports.ENVS = ["local", "test", "docker", "prod", "dev", "uat", "qc", "beta"];
module.exports.DEFAULT_PORT = 5000;
module.exports.DEFAULT_ENV = "local";
module.exports.BLOCKED_COUNTRIES = [
    // Russia and Belarus
    "RU", "BY"
];

module.exports.GAMES = require("./games");
module.exports.AVATARS = require("./avatars");
module.exports.COUNTRIES = require("./countries");

module.exports.SECRETS = require("./secrets");
module.exports.DATABASE = require("./database");
module.exports.REDIS = require("./redis");
module.exports.SERVICES = {

    // --- Legacy services
    jmcs: {
        id: "jmcs",
        name: "JMCS",
        path: "services/jmcs/service.js",
        clients: ["db"]
    },
    wdf: {
        id: "wdf",
        name: "WDF",
        path: "services/wdf/service.js",
        clients: ["db", "memcached"],
        isWdf: true
    },
    // ---

    nas: {
        id: "nas",
        name: "NAS",
        path: "services/nas/service.js",
        clients: []
    },
    tracking: {
        id: "tracking",
        name: "Tracking",
        path: "services/tracking/service.js",
        clients: []
    }

};
module.exports.BLOCKLIST = require("./ip-blocklist.json")

// --------------------
// Server configuration
// --------------------

module.exports.BYPASS_AUTH = false; // Bypasses authorization on API
module.exports.SHOW_RESPONSE_MESSAGES = true; // Shows direct server responds
module.exports.LOG_SERVER_ERRORS = true; // Logs server errors

// Interval of removing dead sessions who haven't been pinged in x seconds
module.exports.EXPIRED_SESSION_INTERVAL = (35 * 1000); // 30 seconds
module.exports.EXPIRED_SESSION_INTERVAL_JD5 = (35 * 1000); // 1 minute
module.exports.EXPIRED_SCORE_INTERVAL = (45 * 1000); // 45 seconds
module.exports.WORLD_RESULT_LIMIT = 15;
module.exports.WORLD_RESULT_LIMIT_JD5 = 25;



module.exports.TOKEN_EXPIRATION = 3 * 3600; // Tokens aren't valid 3 hours after creation

// Headers
module.exports.HEADER_FORCE_JSON = "x-force-json";
module.exports.HEADER_DEBUG = "x-dp-debug";
module.exports.HEADER_API_KEY = "x-api-token";
module.exports.TOKEN_KEY = "token";
module.exports.VALID_USER_AGENT = "WiiDance";

// Bots
module.exports.ENABLE_BOTS = false;
module.exports.MIN_BOT_NAME = 4;
module.exports.MAX_BOT_NAME = 8;
module.exports.MIN_BOT_AMOUNT = 5;
module.exports.MAX_BOT_AMOUNT = 10;

module.exports.PLAYLIST_HISTORY_SIZE = 12;



// --------------------



// --------------------
// Game configuration
// --------------------

module.exports.MAX_SCORE = 13333;
// 1-1000 for 2014
// 1-5000 for 2015 >>
module.exports.MIN_WDF_LEVEL = 1;
module.exports.MAX_WDF_LEVEL = 5000;
// TODO: JD17 has 6 (superstar), JD18 has 7 stars (superstar & megastar)
// so we need to add a way to change max stars depending on game
// (probably make a function in utils with game as param?)
module.exports.LEADERBOARD_RESET_INTERVAL = 7 * 86400000 // 7 days (1 week) so that it's weekly
module.exports.MAX_LOBBY_PLAYERS = 8;
module.exports.MAX_LEADERBOARD_SIZE = 3;
module.exports.NAME_REGEX = new RegExp("^[A-Z0-9]{1,9}$");

// --------------------


// Languages and regions from Wii
// It"s used by JMCS, WDF and DLC Store for localization
module.exports.LANGS = [
    { id: "00", lang: "JA" },
    { id: "01", lang: "EN" },
    { id: "02", lang: "DE" },
    { id: "03", lang: "FR" },
    { id: "04", lang: "ES" },
    { id: "05", lang: "IT" },
    { id: "06", lang: "NL" },
    { id: "07", lang: "ZH" },
    { id: "08", lang: "ZH" },
    { id: "09", lang: "KO" }
];
module.exports.REGIONS = [
    { id: "00", region: "NTSC_J" },
    { id: "01", region: "NTSC" },
    { id: "02", region: "PAL" },
    { id: "03", region: "NTSC_K" }
];