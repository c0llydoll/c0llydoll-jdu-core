const utils = require("../lib/utils");

module.exports = (mapName = String, platform) => {
    const isHD = (platform == "orbis" || platform == "durango");
    const codec = "vp8"; // (platform == "nx") ? "vp9" : "vp8";
    const maxDimensions = isHD ? [1920, 1080] : [1216, 720];
    const adaptionSet = [{
        baseUrl: `jmcs://jd-contents/${mapName}/${mapName}_LOW.webm`,
        bandwith: isHD ? 497830 : 480711,
        initRange: [0, 595],
        segmentRange: [595, 3680]
    }, {
        baseUrl: `jmcs://jd-contents/${mapName}/${mapName}_MID.webm`,
        bandwith: isHD ? 1925551 : 1289647,
        initRange: [0, 595],
        segmentRange: [595, 3760]
    }, {
        baseUrl: `jmcs://jd-contents/${mapName}/${mapName}_HIGH.webm`,
        bandwith: isHD ? 3842966 : 2476601,
        initRange: [0, 595],
        segmentRange: [595, 3810]
    }, {
        baseUrl: `jmcs://jd-contents/${mapName}/${mapName}_ULTRA.webm`,
        bandwith: isHD ? 7940059 : 6802851,
        initRange: [0, 595],
        segmentRange: [595, 3843]
    }];
    const arr = [
        "000000010043383D713F80000000000001000000000000000043383D7100000001000000000000000A766964656F2F7765626D00000003",
        utils.textToHex(codec),
        utils.numToHex(maxDimensions[0]),
        utils.numToHex(maxDimensions[1]),
        "0000000000000001010100000004", // wtf is this, has bit shifted

    ];
    adaptionSet.forEach((a, i) => {
        arr.push(utils.numToHex(i));
        arr.push(utils.numToHex(a.bandwith));
        arr.push(utils.pathToHex(a.baseUrl));
        arr.push(utils.numToHex(a.initRange[0]));
        arr.push(utils.numToHex(a.initRange[1]));
        arr.push(utils.numToHex(a.segmentRange[0]));
        arr.push(utils.numToHex(a.segmentRange[1]));
    });

    return arr.join("");
};