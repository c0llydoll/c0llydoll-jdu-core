const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

module.exports = async (query) => {
    try {
        const { stdout, stderr } = await exec(`${query}`);
    }
    catch(err) {
        throw new Error(`FFmpeg: ${err}`)
    }
};