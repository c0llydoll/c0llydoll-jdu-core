/**
 * Environmental configuration
 */

module.exports.local = {
    FQDN: "localhost",
    PORT: 5000,
    LOG_LEVEL: "debug",
    DEVELOPMENT: true,
    SKUS_DEV: true,
    PRIVATE_ROUTES: true
};

module.exports.prod = {
    FQDN: "stream-prod.danceparty.online",
    PORT: 5000,
    LOG_LEVEL: "info",
    DEVELOPMENT: false,
    SKUS_DEV: false,
    PRIVATE_ROUTES: false
};

module.exports.qc = {
    FQDN: "stream-qc.danceparty.online",
    PORT: 5000,
    LOG_LEVEL: "info",
    DEVELOPMENT: false,
    SKUS_DEV: true,
    PRIVATE_ROUTES: false
};