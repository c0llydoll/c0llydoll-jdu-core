const fs = require("fs");
const express = require("express");
const router = express.Router();

const Playlist = require("wdf-playlist");
const cache = require("cache");

router.get("/get", async (req, res, next) => {
    const version = Number(req.query.version);
    if (!version) return next({
        status: 400,
        message: "Version query needed"
    });

    try {
        const playlist = new Playlist(version);
        const screens = await playlist.getScreens();
        const history = await playlist.getHistory();
        return res.send({
            screens,
            history
        });
    }
    catch(err) {
        return next({
            status: 400,
            message: err.message
        });
    }
});

router.get("/rotate", async (req, res, next) => {
    const version = Number(req.query.version);
    if (!version) return next({
        status: 400,
        message: "Version query needed"
    });

    try {
        const playlist = new Playlist(version);
        const before = await playlist.getScreens();
        const screens = await playlist.rotateScreens();
        const after = await playlist.getScreens();
        const history = await playlist.getHistory();
        return res.send({
            before,
            after,
            history
        });
    }
    catch(err) {
        return next({
            status: 400,
            message: err.message
        });
    }
});

router.get("/reset", async (req, res, next) => {
    const version = Number(req.query.version);
    if (!version) return next({
        status: 400,
        message: "Version query needed"
    });

    try {
        const playlist = new Playlist(version);
        await playlist.resetScreens();
        await playlist.resetHistory();
        return res.sendStatus(200);
    }
    catch(err) {
        return next({
            status: 400,
            message: err.message
        });
    }
});


router.get("/reset-all", async (req, res, next) => {
    const games = require("games");
    const gamesList = games.getGames();

    // Reset playlist of all games
    for (let i = 0; i < gamesList.length; i++) {
        const { version } = gamesList[i];
        const playlist = new Playlist(version);
        await playlist.resetScreens();
    }
    return res.sendStatus(200);
});
module.exports = router;