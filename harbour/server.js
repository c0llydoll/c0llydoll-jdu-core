require("dotenv").config();
global.config = require("./config");
global.root = __dirname;
global.env = global.config.ENV;

const express = require("express");
const app = express();
const logger = require("signale");

const loadClients = require("./lib/load-clients");
const loadServices = require("./lib/load-services");
const httpMiddleware = require("./lib/http-middleware")

const expressip = require('express-ip');
app.use(expressip().getIpInfoMiddleware);

(async () => {
    await loadClients();
    await loadServices(app);

    app.use(httpMiddleware.notFound)
    app.use(httpMiddleware.errorHandler)

    app.listen(global.config.PORT, () => {
        logger.success(`Harbour started on port ${global.config.PORT}`);
    });
})();



