/**
 * Service configuration
 */

module.exports.PORT = 9000;

module.exports.COMMUNITIES = require("./config/communities");
module.exports.DURATIONS = require("./config/durations");
module.exports.THEMES = require("./config/themes");

module.exports.HAPPYHOUR = {
    time: 1674502588554,
    duration: 3600000
};

// Temporary unlocked songs
module.exports.LOCKED = {
    starCountToUnlock: 500000,
    lastSong: 25259885272, // ItsYouSWT (testing if alts need to be last unlocked to be played by game)
    nextSong: 21624006940 // PrinceAli (also unavailable in songdb)
};