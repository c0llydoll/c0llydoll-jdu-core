const glob = require("glob-promise");
const path = require("node:path");
const utils = require("./utils");

/**
 * Loads all server configuration into one object.
 * 1. Gets "env" and "port" from ".env"
 * 2. Sets up a base configuration in case any keys are missing in env config (not ".env")
 * 3. Loads environment's config file and server's base config
 * 4. Combines base config, server config and environment's config into one.
 * @param {*} envConfig ".env" file result
 * @returns Configuration
 */
module.exports = async (envConfig) => {
    if (!envConfig)
        throw new Error(`Can't load config, "envConfig" is not present.`)
    
    const ENV = envConfig.NODE_ENV || "local";
    const PORT = envConfig.PORT || 3000;
    const isDev = utils.isDev(ENV);

    const serverConfig = require("../config");
    
    // Set-up a base configuration, it will get overwritten from what's in env config
    const serviceConfig = {
        ENV,
        PORT,
        FQDN: "localhost",
        LOG_LEVEL: isDev ? "debug" : "info",
        DEVELOPMENT: isDev,
        SKUS_DEV: isDev,
        PRIVATE_ROUTES: isDev
    };
    const secrets = {};
    
    // Load the "secrets" folder and append them to "secrets" object
    const secretsPath = path.resolve("./config/secrets/");
    const secretClients = await glob.promise(secretsPath + "/*.js");
    secretClients.forEach((client) => {
        client = require(client);
        if (client.secret) secrets[client.clientName] = client.secret;
        else secrets[client.clientName] = client.environments[ENV];
    });

    return {
        ...serviceConfig,
        ...serverConfig,
        ...require("../config/envs")[ENV],
        SECRETS: secrets
    };
};