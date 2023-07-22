/**
 * Tracking
 */

const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

const morganMiddleware = require("morgan-middleware");
const validate = require("http-validate");
const mids = require("http-middleware");
const logger = require("logger")("tracking");
const uenc = require("uenc");
const securityWall = require("security-wall");

global.logger = logger;

// Middlewares
app.use(express.static(__dirname + "/static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(securityWall);
app.use(uenc.client);

app.set("trust proxy", "loopback");
app.disable("x-powered-by");
app.disable("etag");

app.post("/", async (req, res, next) => {
    return res.uenc({
        TAG_ID: "",
        JD_Privileges: "",
        product_code: "2399fff0497ae598539ccb3a61387f67833055ad",
        product_password: "JejDUqq7",
        login: "",
        token: "",
        activatekey: "",
        key: "",
        action: "",
        track: "",
        env: "",
        prod: "",
        session_id: "13123",
        product_id: "2399fff0497ae598539ccb3a61387f67833055ad",
        user_id: "123132",
        tag: "",
        attributes:  "",
        sequence: "",
        delta: ""
    });
});

app.use(mids.errorHandler);
app.use(mids.notFound);

module.exports = app;