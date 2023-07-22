const { WebServiceClient } = require('@maxmind/geoip2-node');

module.exports = (cb) => {
    try {
        const client = new WebServiceClient(process.env.MAXMIND_ID, process.env.MAXMIND_LICENSE_KEY, {host: 'geolite.info'});
        global.maxmind = client;
        return cb();
    }
    catch(err) {
        return cb(err);
    };
};