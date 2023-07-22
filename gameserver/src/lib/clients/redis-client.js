const { createClient } = require('redis');

module.exports = async (uri) => {
    try {
        const client = createClient(uri);
        client.on('error', err => { throw new Error(err) });
    
        await client.connect();
        global.redisClient = client;
    }
    catch(err) {
        throw new Error(`Can't connect to Redis: ${err}`);
    }
};