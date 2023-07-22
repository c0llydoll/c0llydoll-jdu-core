const utils = require("./utils");

class S3Helper {
    constructor(bucket) {
        this.client = global.s3;
        this.config = global.secrets.s3;
        this.bucket = bucket || this.config.bucket;
        this.protocol = this.config.useSSL ? "https" : "http";
    };

    async getObject(path) {
        const data = await this.client.getObject(this.bucket, path);
        if (!data) return;
        return utils.streamToString(data);
    }

    async signUrl(path, duration = 3600) {
        if (path.startsWith("http")) {
            const url = new URL(url);
            path = url.pathname;
        };
        return await this.client.presignedGetObject(this.bucket, path, duration);
    };

    async listObjects(path) {
        return await global.s3.listObjectsV2(this.bucket, path);
    };

    async putObject(path, data) {
        return await global.s3.putObject(this.bucket, path, data);
    };

    async getLatestObject(path) {
        if (!path.endsWith("/")) path += "/";
        const objectsList = await new Promise((resolve, reject) => {
            const objectsListTemp = [];
            const stream = global.s3.listObjectsV2(this.bucket, path);

            stream.on('data', obj => objectsListTemp.push(obj));
            stream.on('error', reject);
            stream.on('end', () => {
                // Sort all objects by earliest to latest date
                objectsListTemp.sort((a, b) => new Date(a.lastModified) - new Date(b.lastModified));
                resolve(objectsListTemp);
            });
        });
        return objectsList[objectsList.length - 1];
    };
}

module.exports = S3Helper;