const { Router } = require("express");
const { readdirSync, statSync } = require("node:fs");
const path = require("node:path");
const { createLogger } = require("./logger");

/**
 * Loads all available services in "./services" folder and creates a router for them.
 * We have both public and private routers, public is self explaining
 * meanwhile private is used for dev environments.
 * You can enable private routes with "PRIVATE_ROUTES" in config.
 * @param {*} app 
 */
module.exports = (app) => {
    const servicesPath = path.resolve(global.root, "services");
    const content = readdirSync(servicesPath).filter(f => !f.startsWith("_"));

    for (let i = 0; i < content.length; i++) {
        const filename = content[i];
        const fullPath = path.resolve(servicesPath, filename);

        if (!statSync(fullPath).isFile()) continue;

        const [ name, version ] = filename.split(".");
        const logger = createLogger({ service: name });

        const route = `/${name}/${version}`;
        const publicRouter = Router({
            strict: true,
            caseSensitive: true
        });
        const privateRouter = Router({
            strict: true,
            caseSensitive: true
        });

        require(fullPath)(app, publicRouter, privateRouter, logger);
        app.use(route, publicRouter);
        
        if (global.config.PRIVATE_ROUTES)
            app.use(route, privateRouter);
    }
};