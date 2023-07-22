const utils = require("../lib/utils");

module.exports = (mapName = String) => {
    const mpd = `${mapName.toLowerCase()}.mpd`;
    const webm = `${mapName.toLowerCase()}.webm`;
    const videosCoachPath = `world/maps/${mapName.toLowerCase()}/videoscoach/`;
    
    return [
        `00000001000000003F8000003F800000000000000000000000000000000000010000000000000000000000000000000000000000FFFFFFFF0000000000000015766964656F5F706C617965725F6D61696E2E74706C0000001A776F726C642F5F636F6D6D6F6E2F766964656F73637265656E2FF5D5E8F20000000000000000000000011263DAD9`,
        utils.numToHex(webm.length),
        utils.textToHex(webm),
        utils.numToHex(videosCoachPath.length),
        utils.textToHex(videosCoachPath),
        "0FE6814C",
        "00000000",
        utils.numToHex(mpd.length),
        utils.textToHex(mpd),
        utils.numToHex(videosCoachPath.length),
        utils.textToHex(videosCoachPath),
        "CDFD65B8",
        "0000000000000000"
    ].join("");
};