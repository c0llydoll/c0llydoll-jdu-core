/**
 * DanceParty Stream Central Server
 */

global.root = __dirname;

const express = require("express");
const bodyparser = require("body-parser");
const app = express();

const project = require("./package.json");
const loadConfig = require("./lib/load-config");
const loadClients = require("./lib/load-clients");
const loadServices = require("./lib/load-services");
const mids = require("./lib/http-middleware");
const { createLogger } = require("./lib/logger");

// Append response headers
app.use((req, res, next) => {
    res.append("Server", `DP-Stream-${project.version}`);
    return next();
});

/**
 * Loads all required data in order
 * 1. Load ".env" configuration
 * 2. Load server & service configuration
 * 3. Set global variables
 * 4. Create a logger
 * 5. Set-up all middlewares
 * 6. Load all services
 */
(async() => {
    // Load ".env" configuration
    const { parsed: envConfig } = require("dotenv").config();
    
    // Load configuration
    const config = await loadConfig(envConfig);

    // Set global variables
    global.ENV = config.ENV;
    global.PORT = config.PORT;
    global.config = config;
    global.secrets = config.SECRETS;
    global.project = project;

    // Create a logger
    const logger = createLogger({ service: "stream" });

    // Load all clients
    await loadClients(logger);
    logger.success("Loaded clients!");

    // Load localization
    await require("./lib/locs").init();
    logger.success("Loaded localization!");

    // Connect to content manager and initiate all data
    await require("./lib/content-manager").init();
    logger.success("Fetched data from Content Manager!");

    // Load any middleware needed before loading services
    app.use(bodyparser.json()); // Body middleware

    mids.init(app, logger);
    app.use(express.static(__dirname + "/static"));

    // Load all services
    loadServices(app);

    // Set not found and error handle middlewares
    app.use(mids.notFound);
    app.use(mids.errorHandler);

    // Bind to port
    app.listen(config.PORT, () => {
        logger.info(`Stream is listening port ${global.PORT} in "${global.ENV}" environment`);
    });
})();

// Catch all uncaught exceptions and make the server exit
process.on("uncaughtException", function(err) {
    console.error(err);
    setTimeout(function() {
        process.exit(8);
    }, 2000);
});