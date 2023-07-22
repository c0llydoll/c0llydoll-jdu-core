require("dotenv").config();
global.config = require("./config");
global.secrets = global.config.secrets;
global.project = require("../package.json");
global.root = __dirname;

const fs = require("node:fs");
const path = require("node:path");
const axios = require("axios");

const utils = require("./lib/utils");
const signale = require("signale");

(async() => {

    // const command = await require("./cli")();
    // const commandPath = path.resolve(__dirname, "commands", command + ".js");
    // if (!fs.existsSync(commandPath))
    //     throw new Error(`${commandPath} is not an existing path, can't find command, exiting!`);
    
    // Load all clients before calling command
    try {
        const res = await axios({
            method: "GET",
            url: global.secrets.stream.fqdn + "/status/v1/info",
            headers: { "user-agent": `${global.project.name}-${global.project.version}`}
        });
        const { env, version, branch } = res.data;
        signale.success(`Connected to Stream API successfully!`);
        signale.info(`Stream API: Environment "${env}" / Version "${version}" / Branch "${branch}"`);
    }
    catch(err) {
        console.log(err)
        throw new Error(`Seems like Stream API is not online, try again later or contact devs!`);
    };
    await require("./lib/load-clients")();

    utils.tmpFolder("map");
    utils.tmpFolder("pictos");
    utils.tmpFolder("package");

    return require("./commands/map-create-p4")() // require(commandPath)();
})();