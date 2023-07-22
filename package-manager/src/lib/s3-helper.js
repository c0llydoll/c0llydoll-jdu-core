class S3Helper {
    constructor(bucket) {
        this.client = global.s3;
        this.config = global.config.secrets.s3;
        this.bucket = bucket || this.config.bucket;
        this.protocol = this.config.useSSL ? "https" : "http";
    };

    async putObject(path, data, metadata = {}) {
        return await global.s3.putObject(this.bucket, path, data, metadata);
    };

}

module.exports = S3Helper;