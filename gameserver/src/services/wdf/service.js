/**
 * JMCS service
 */

const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

const morganMiddleware = require("morgan-middleware");
const validate = require("http-validate");
const mids = require("http-middleware");
const logger = require("logger")("wdf");
const uenc = require("uenc");
const worker = require("./worker");

global.logger = logger;
global.httpSchema = require("./http-schema");

// Middlewares
app.use(express.static(__dirname + "/static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morganMiddleware());
app.use(uenc.client);
app.use(validate);

app.set("trust proxy", "loopback");
app.disable("x-powered-by");
app.disable("etag");

app.use((req, res, next) => {
    res.set("Connection", "close");
    return next();
});

const rooms = {
    "wdf-jd5": "wdf",
    "wdf-jd15": "wdf15",
    "wdf-legacy": "wdfjd6"
};

app.use("/api", require("./api/service"));

// Only initate WDF rooms if server isn't in test mode
if (!global.args["test-mode"]) {
    app.post("/wdf", require("./load-funcs")("wdf-jd5"));
    app.post("/wdf15", mids.agentCheck, require("./load-funcs")("wdf-jd15"));
    app.post("/wdfjd6", mids.agentCheck, require("./load-funcs")("wdf-legacy"));
}

app.use(mids.errorHandler);
app.use(mids.notFound);

// Start worker
worker();

module.exports = app;