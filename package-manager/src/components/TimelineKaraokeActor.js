const utils = require("../lib/utils");

module.exports = (mapName = String) => {
    const filename = `${mapName.toLowerCase()}_tml_karaoke.tpl`;
    const filepath = `world/maps/${mapName.toLowerCase()}/timeline/`;
    
    return [
        `00000001000000003F8000003F800000000000000000000000000000000000010000000000000000000000000000000000000000FFFFFFFF00000000`,
        utils.numToHex(filename.length),
        utils.textToHex(filename),
        utils.numToHex(filepath.length),
        utils.textToHex(filepath),
        "813B1C44",
        "000000000000000000000001231F27DE"
    ].join("");
};