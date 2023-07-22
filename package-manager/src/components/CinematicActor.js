const utils = require("../lib/utils");

module.exports = (mapName = String) => {
    const filename = `${mapName.toLowerCase()}_mainsequence.tpl`;
    const filepath = `world/maps/${mapName.toLowerCase()}/cinematics/`;
    
    return [
        `00000001000000003F8000003F800000000000000000000000000000000000010000000000000000000000000000000000000000FFFFFFFF00000000`,
        utils.numToHex(filename.length),
        utils.textToHex(filename),
        utils.numToHex(filepath.length),
        utils.textToHex(filepath),
        "2347ADD0000000000000000000000001677B269B"
    ].join("");
};