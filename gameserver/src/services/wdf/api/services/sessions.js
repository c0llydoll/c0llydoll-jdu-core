const fs = require("fs");
const express = require("express");
const router = express.Router();

const utils = require("utils");
const validate = require("../validator");
const games = require("games");

const Session = require("wdf-session");
const Playlist = require("wdf-playlist");
const Scores = require("wdf-score");
const Bots = require("wdf-bots");

const { uniqueNamesGenerator, adjectives, colors, animals, names } = require('unique-names-generator');
const nameConfig = {
    dictionaries: [names], // colors can be omitted here as not used
    separator: "",
    style: "upperCase"
};

router.post("/delete-bots", validate("deleteBots"), async (req, res, next) => {
    const { amount, version } = req.body;

    try {
        const bots = new Bots(version);
        const { scoreCount, sessionCount } = await bots.clearBots();
        
        global.logger.info(`Deleted ${sessionCount} bots and ${scoreCount} bot scores from ${version} WDF!`);

        return res.json({
            message: `Deleted ${sessionCount} bots and ${scoreCount} bot scores from ${version} WDF!`
        });
    }
    catch(err) {
        return next({
            status: 500,
            message: err.message
        });
    };
});

router.get("/ccu", async(req, res, next) => {

    const gameList = games.getGames();
    let data = {};
    for (let i = 0; i < gameList.length; i++) {
        const game = gameList[i];   
        const version = game.version;
        const session = new Session(version);
        data[version] = await session.sessionCount() || 0;
    }

    return res.send(data);
});

router.post("/status", validate("sessionsStatus"), async (req, res, next) => {

    const { version } = req.body;

    try {

        const session = new Session(version);
        const playlist = new Playlist(version);
        const scores = new Scores(version);

        const screens = await playlist.getScreens();
        const topScores = await scores.getRanks(10);
        const { themeResults, winner } = await scores.getThemeAndCoachResult();
        const numberOfWinners = await scores.getNumberOfWinners(themeResults);

        let result = {
            count: await session.sessionCount(),
            playlist: {
                prev: {},
                cur: {},
                next: {}
            },
            themeResults,
            numberOfWinners,
            winnerTheme: winner,
            topScores: topScores.map(s => {
                return {
                    profile: s.profile,
                    coachIndex: s.coachIndex,
                    themeIndex: s.themeIndex,
                    totalScore: s.totalScore,
                    stars: s.stars,
                    rank: s.rank,
                    isBot: s.isBot
                }
            })
        };

        for (const key in result.playlist) {
            if (Object.hasOwnProperty.call(result.playlist, key)) {
                const screen = screens[key];
                if (!screen) continue;

                const { mapName, title, artist, numCoach, difficulty } = screen.map;
    
                result.playlist[key] = {
                    theme: {
                        ...screen.theme,
                        isVote: playlist.isThemeVote(screen.theme.id),
                        isCommunity: playlist.isThemeCommunity(screen.theme.id),
                        isCoach: playlist.isThemeCoach(screen.theme.id)
                    },
                    map: { mapName, title, artist, numCoach, difficulty },
                    timing: {
                        songStart: screen.timing.start_song_time,
                        songEnd: screen.timing.stop_song_time,
                        recapStart: screen.timing.recap_start_time,
                        recapEnd: screen.timing.request_playlist_time,
                        preSongStart: screen.timing.base_time,
                        preSongEnd: screen.timing.start_song_time
                    }
                };
            };
        };

        return res.json(result);
    }
    catch(err) {
        console.log(err)
        return next({
            status: 500,
            message: "Can't fetch status",
            error: err.message
        });
    };
});

router.get("/lobbies", async (req, res, next) => {
    const { version } = req.query;

    try {
        const session = new Session(Number(version));
        return res.json(await session.getLobbies());
    }
    catch(err) {
        return next({
            status: 500,
            message: err.message
        });
    };
});

module.exports = router;