module.exports.PORT = process.env.PORT || 8500;
module.exports.ENV = process.env.NODE_ENV || "local";

module.exports.HOST = "harbour.danceparty.online";
module.exports.PROTOCOL = "https";
module.exports.FQDN = this.PROTOCOL + "://" + this.HOST;

module.exports.SECRETS = {
    mongodb: {
        local: {
            HOST: "127.0.0.1",
            PORT: 27017,
            DB: "dp-harbour-local"
        }
    },
    harbour: {
        secret: "fukHHgxVXrrnGCP09DXpOZXNJj9dMYNI",
        options: { 
            algorithm: 'HS512',
            expiresIn: (3 * 3600) // 3 hrs 
        }
    }
};

module.exports.US = {
    host: "public-ubiservices.ubi.com"
}