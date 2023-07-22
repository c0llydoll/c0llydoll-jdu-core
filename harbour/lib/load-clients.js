const mongoose = require("mongoose");
const { Client } = require("memjs");
const logger = require("signale");

module.exports = async () => {

    // Connect to Memcached
    const client = Client.create();
    global.memcached = client;
    logger.success("Connect to Memcached!");

    // Connect to MongoDB
    const db = global.config.SECRETS.mongodb[global.config.ENV];
    const dbURI = `mongodb://${db.HOST}:${db.PORT}/${db.DB}`;

    mongoose.set('strictQuery', false);
    await mongoose.connect(dbURI, {});
    
    global.dbClient = mongoose.connection.getClient();
    logger.success(`Connected to MongoDB!`);
};