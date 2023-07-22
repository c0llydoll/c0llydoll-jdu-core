const fs = require("node:fs");
const path = require("node:path");
const hexToRgba = require('hex-rgba');

class Utils {
    constructor() {};

    tmpFolder(childrenPath = "") {
        const tmpBase = path.resolve((global.root || "../"), "tmp");

        const childDir = path.dirname(childrenPath);
        const childBase = path.basename(childrenPath);

        const folder = path.resolve(tmpBase, childDir);
        const file = path.resolve(folder, childBase);
        
        if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });

        return file;
    };

    arrayToListString(arr = []) {
        if (arr.length == 1) return arr.join("");
        const last = arr.pop();
        const result = arr.join(', ') + ' and ' + last;
        return result;
    };

    hexToUAF(hex = "0000ff") {
        if (hex.startsWith("#")) hex = hex.substring(1);
        if (hex.startsWith("0x")) hex = hex.substring(2);
        return hexToRgba(hex, 1);
    };

    numToHex(num) {
        return("00000000" + num.toString(16).toUpperCase()).slice(-8);
    };

    textToHex(str) {
        return Buffer.from(str, "utf8").toString("hex");
    };

    pathToHex(path) {
        return (this.numToHex(path.length)) + (this.textToHex(path));
    };

    randomFloat() {
        return Number((Math.random() * (0.000000 - 0.999999) + 0.999999).toFixed(6))
    };
};

module.exports = new Utils();