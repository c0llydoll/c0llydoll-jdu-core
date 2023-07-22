const fs = require("fs");
const express = require("express");
const router = express.Router();

const utils = require("utils");

const cheatDetection = require("cheat-detection");

router.post("/ban-player", async (req, res, next) => {
    let uid = req.body.userId;
    let pid = req.body.profileId;
    let reason = req.body.reason;
    let author = req.body.author;
    if (!uid) {
        return next({
            status: 400,
            message: `userId required!`
        })
    }

    const result = await cheatDetection.banUser({
        profileId: pid || "empty",
        userId: uid || "",
        reason: reason || "No reason given.",
        author: author || "No author / banned from API"
    });
    return res.json(result)
});

module.exports = router;