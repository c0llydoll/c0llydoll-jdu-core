const config = require("./config");
global.config = config;
global.root = __dirname;

const Minio = require("minio")

const minioClient = new Minio.Client({
    endPoint: config.s3Endpoint,
    useSSL: config.s3UseSSL,
    accessKey: config.s3AccessKey,
    secretKey: config.s3SecretKey,
    bucket: config.s3Bucket,
    bucketLocalization: config.s3LocBucket
});
global.s3 = minioClient;

const express = require("express");
const app = express();
const logger = require("signale");

const { resolve } = require("path");
const { existsSync } = require("fs");

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.method, req.originalUrl)
    next()
});


app.post("/hook", async (req, res, next) => {
    try {
        const { event, model } = req.body;
    
        if (event == "trigger-test") return res.sendStatus(200);
    
        const eventPath = resolve(__dirname, "events", event + ".js");

        if (!existsSync(eventPath)) {
            console.log("unknwon event", event)
            return res.status(400).send("unknown event");
        }

        await require(eventPath)(req.body);
        return res.sendStatus(200);
    }
    catch(err) {
        console.log(err)
        return res.status(500).send(err);
    };
});

app.listen(config.port, () => {
    logger.success("Webhook started on port " + config.port);
});
