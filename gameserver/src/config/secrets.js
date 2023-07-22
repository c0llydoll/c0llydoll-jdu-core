// Used for signing/verifying NAS tokens.
module.exports.NAS_TOKEN = {
    server: process.env.NAS_SERVER,
    iv: process.env.NAS_IV,
    key: process.env.NAS_KEY,
    algorithm: "aes-256-cbc"
};

// Keys which are allowed to access the API.
module.exports.API_KEYS = process.env.API_KEYS.split(",") || [];

// Used in development.
module.exports.TEST_TOKENS = [
    "test"
];

module.exports.TRACKING_AUTH = {
    wiitracking: {
        pass: "AA2ieaYP",
        version: 2014,
        productId: "2399fff0497ae598539ccb3a61387f67833055ad",
        productPass: "JejDUqq7"
    },
    jdjapantrkw: {
        pass: "AA2ieaYP",
        version: 1000,
        productId: "a09302313bd087b88a54fe1a010eb62ea3edbfad",
        productPass: "DFe3qab8"
    },
    jdbeatstrkw: {
        pass: "AA2ieaYP",
        version: 2000,
        productId: "a8a64cef262a04de4872b68b63ab7cd8ee3dfabe",
        productPass: "E4aae3fb"
    }
};