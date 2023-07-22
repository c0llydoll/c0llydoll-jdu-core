const fs = require("fs");
const path = require("path");
const moduleAlias = require("module-alias");

/**
 * Registers all libraries in "lib/" folder as a module for easier access.
 * Say good bye to shitty paths like require("../../../../../ur-mom")
 */
module.exports = () => {
    let aliases = {
        "@root": "."
    };
    let libFolder = path.resolve(__dirname, "lib");
    let content = fs.readdirSync(libFolder);
    for (let i = 0; i < content.length; i++) {
        const item = content[i];
        const _path = path.resolve(libFolder, item);

        if (!fs.statSync(_path).isFile) continue; // Skip folders

        const name = item.split(".")[0];
        aliases[name] = _path;
    }

    moduleAlias.addAliases(aliases);
};