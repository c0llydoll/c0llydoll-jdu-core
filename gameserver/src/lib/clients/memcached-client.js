const { Client } = require("memjs");

module.exports = (cb) => {
    try {
        const client = Client.create();
        global.memcached = client;
        return;
    }
    catch(err) {
        throw new Error(`Can't connect to Memcached: ${err}`);
    }
};