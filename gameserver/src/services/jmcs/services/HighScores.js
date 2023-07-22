

const Joi = require("joi")
const parseMultiPart = require("express-parse-multipart");

const nas = require("nas-token-client");
const utils = require("utils");

const leaderboard = require("leaderboard");

const gameClient = require("games-client");
const songClient = require("songs-client");
const dcClient = require("dancercard-client");

module.exports = {

    name: `HighScores`,
    description: `Provides all Mash-Up data such as online maps and metadata.`,
    version: `1.0.0`,

    async init(app, router) {

        /**
         * After parsing multi part body
         * it will set all values to an object but keep partialScores as a buffer
         */
        function parseScoreData(req, res, next) {
            let body = {};
            // Parse the form-data body
            if (!req.formData)
                return next({
                    status: 400,
                    message: `Missing form data`
                });

            // Keep partialScores a buffer
            req.formData.map(a => {
                if (a.name !== "partialScores") body[a.name] = Buffer.from(body[a.name] = a.data).toString();
                else body[a.name] = a.data;
            });

            req.body = body;
            return next();
        };

        /**
         * Used when a map ends, saves client's map score to database 
         * for leaderboards and opponents
         * - Parse multi part body to an object
         * - Fetch client's dancercard & game for profileId and gameId
         * - Save score from body to database
         */
        router.post("/uploadMyScore",
            parseMultiPart,
            parseScoreData,
            nas.require,
            dcClient,
            gameClient,
            songClient,
        async (req, res) => {
            
            const { coachId, gameMode, songId, totalScore, partialScores } = req.body;
            
            // totalScore multiplied by maxScore will result in the actual score
            const realScore = parseInt(totalScore * global.gs.MAX_SCORE);

            // Create a new score
            const newScore = await leaderboard.newScore({
                profileId: req.pid,
                userId: req.uid,
                mac: req.mac,
                userCountry: req.profile.country,
                coachId,
                gameMode,
                game: {
                    id: req.gid,
                    version: req.game.version
                },
                songId,
                score: realScore,
                totalScore,
                partialScores
            });

            if (utils.isDev())
                return res.status(200).json(newScore);

            return res.status(200).send();
        });

        /**
         * Used by the game to fetch online opponents
         */
        router.post("/lookForOpponentHighScores", nas.require, async (req, res, next) => {
            return res.sendStatus(502);
            const { gameMode, minimalScore, songId } = req.body;
            return res.uenc({
                playerId0: "23ad6744b6c7",
                coachId0: 0,
                totalScore0: 0.556543
            })
        });

        /**
         * Unknown, found in source code: TBD
         */
        router.post("/lookForSpecificHighScore", (req, res, next) => {
            return res.sendStatus(502);
        });

        router.post("/getPartialScores", (req, res, next) => {
            return res.sendStatus(502);
            let scores = ["DQoBcABVVVfT85vnV1lT85vlVXVT8tjn///+//L////1"]
            return res.send(
                scores.map(s => Buffer.from(s, "base64")).join("\n")
            );
        })

    }
}