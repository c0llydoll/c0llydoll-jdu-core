const md5 = require("md5");

const S3Helper = require("../lib/s3-helper");

class Locs {
    constructor() {
        this.s3 = new S3Helper();
        this.defaultLanguage = global.config.DEFAULT_LANGUAGE;
        this.locsFolder = `private/localization`
    };

    /**
     * Loads localization from localization bucket.
     * Downloads the loc file and keeps the data in global.locs and global.languages
     */
    async init() {
        const s3 = new S3Helper(global.secrets.s3.bucketLocalization);
        const locFile = await s3.getObject("localization.json");
        if (!locFile) throw new Error(`Couldn't fetch locFile!`);

        const locData = JSON.parse(locFile);
        let languages = [];

        Object.values(locData).forEach(l => {
            let codes = Object.keys(l);
            languages = [...new Set([...languages, ...codes])].sort();
        });

        global.locs = locData;
        global.languages = languages;
        await this.uploadLocalization(locData)
    };

    async getLocsUrl() {
        const latestHash = await this.getLatestHash();
        const signedUrl = await this.s3.signUrl(`${this.locsFolder}/${latestHash}.json`);
        return { url: signedUrl, hash: latestHash };
    }

    async getLatestHash() {
        const latest = await this.s3.getLatestObject(this.locsFolder);
        if (!latest) return;
        return latest.etag;
    };

    async uploadLocalization(locs = {}) {
        const hash = md5(JSON.stringify(locs));
        const latestHash = await this.getLatestHash();

        // Given locs hash does not match latest hash in bucket
        // which means we must upload the new localization
        if (hash !== latestHash) {
            locs = JSON.stringify(locs);
            const path = `${this.locsFolder}/${hash}.json`;
            await this.s3.putObject(path, locs);
        };
    };
};

module.exports = new Locs();