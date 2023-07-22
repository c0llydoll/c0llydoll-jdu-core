const fs = require("fs");
const express = require("express");
const router = express.Router();

const utils = require("utils");
const games = require("games");

router.get("/games", (req, res) => {
    return res.json({
        games: global.gs.GAMES
    });
});

router.get("/games/:idOrVersion", (req, res) => {
    const idOrVersion = req.params.idOrVersion;
    const isAvailable = games.isGameAvailable(idOrVersion);
    if (!isAvailable) return next({
        status: 404,
        message: `${idOrVersion} is an unknown game!`
    });

    const game = games.getGameById(idOrVersion) || games.getGameByVersion(idOrVersion);
    return res.json(game);
});

module.exports = router;