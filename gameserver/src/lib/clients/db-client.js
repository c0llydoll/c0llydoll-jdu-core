
const mongoose = require("mongoose");

module.exports = async (url) => {
    try {
        if (!url) throw new Error(`Database did not receive any connection url!`)
        
        mongoose.set('strictQuery', false);
        await mongoose.connect(url, {});

        global.dbClient = mongoose.connection.getClient();
        return;
    }
    catch(err) {
        throw new Error(err);
    }
}