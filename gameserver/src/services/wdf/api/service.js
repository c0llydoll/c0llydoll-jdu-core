const fs = require("fs");
const express = require("express");
const router = express.Router({ 
    caseSensitive: true, 
    strict: true 
});

const mids = require("http-middleware");

router.use((req, res, next) => {
    req.isApi = true;
    return next();
});

router.use(mids.apiAuth);

router.use("/config", require("./services/config"));
router.use("/leaderboard", require("./services/leaderboard"));
router.use("/moderation", require("./services/moderation"));
router.use("/playlist", require("./services/playlist"));
router.use("/sessions", require("./services/sessions"));
router.use("/songs", require("./services/songs"));

module.exports = router;