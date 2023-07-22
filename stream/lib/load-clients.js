const mongoose = require("mongoose");
const Minio = require('minio');

module.exports = async (logger) => {

    // Set S3 client
    const minioClient = new Minio.Client(global.config.SECRETS.s3);
    global.s3 = minioClient;

    // Connect to MongoDB
    const db = global.config.SECRETS.mongodb;
    const dbURI = `mongodb://${db.HOST}:${db.PORT}/${db.DB}`;

    mongoose.set('strictQuery', false);
    await mongoose.connect(dbURI, {});
    
    global.dbClient = mongoose.connection.getClient();
    logger.success(`Connected to MongoDB!`);
};