const BadWords = require('bad-words');

class Utils {
    constructor() {
        this.profanity = new BadWords({
            list: require("../config/profanity.json")
        });
    }

    random(arr = []) {
        return arr[Math.floor((Math.random() * arr.length))];
    }

    getConfig() {
        let config = {
            gsConf: global.gs,
            srvConf: global.config
        };

        config.gsConf.DATABASE = "PROTECTED";
        config.gsConf.SECRETS = "PROTECTED";

        return config;
    }

    /**
     * Health check middleware
     * @param {*} req 
     * @param {*} res 
     * @returns {any}
     */
    healthCheck(req, res) {
        return res.end(process.uptime().toString());
    }

    /**
     * Checks if server's enviroment is a dev enviroment
     * @returns {Boolean}
     */
    isDev() {
        let env = global.ENV;
        return ["dev", "local", "uat", "docker", "test", "beta"].includes(env.toLowerCase());
    }

    /**
     * Current server time
     * @returns {Number}
     */
    serverTime() {
        return Date.now();
    }

    randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    isProfane(string) {
        return this.profanity.isProfane(string)
    }

    profane = (value, helpers) => {
        if (this.profanity.isProfane(value)) {
            throw new Error(`"${value}" is not an allowed word!`);
        }
        return value;
    }
}

module.exports = new Utils();