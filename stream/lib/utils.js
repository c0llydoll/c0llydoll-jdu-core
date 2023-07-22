/**
 * Utils helps the server with quick and easy functions!
 */

const time = require("./time");

class Utils {
    constructor() {}

    /**
     * Checks if current environment is a dev environment
     * @param {String} env Instead of checking server environment, you can pass your own environment to check
     * @returns 
     */
    isDev(env = (global.config?.env || process.env.NODE_ENV)) {
        return ["local", "dev", "test", "uat"].includes(env);
    };

    serverTime() {
        return time.milliseconds();
    };

    streamToString(stream) {
        const chunks = [];
        return new Promise((resolve, reject) => {
          stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
          stream.on('error', (err) => reject(err));
          stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
        });
    };
};

module.exports = new Utils();