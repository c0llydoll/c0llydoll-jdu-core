const Minio = require('minio');

module.exports = async () => {
    const minioClient = new Minio.Client(global.config.secrets.s3);
    global.s3 = minioClient;
};