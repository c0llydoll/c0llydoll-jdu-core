const nas = require("nas-token-client");
const leaderboard = require("leaderboard");
const uenc = require("uenc");

const gameClient = require("games-client");
const songClient = require("songs-client");

module.exports = {

    name: `Leaderboard`,
    description: `Serves global and regional leaderboard data for maps`,
    version: `1.0.0`,

    async init(app, router) {
        
        /**
         * Used for Worldwide Leaderboard for a song
         */
        router.post("/getWorldWideLeaderBoard", 
            nas.require,
            gameClient,
            songClient,
        async (req, res, next) => {
            
            const { songId } = req.body;
            const version = req.game.version;
            
            const entries = await leaderboard.getBoard(songId, version);

            return res.uenc({
                ...uenc.setIndex(entries),
                count: entries.length,
                startingRank: 1
            });

        });

        /**
         * Used for Country Leaderboard for a song
         */
        router.post("/getCountryLeaderBoard", 
            nas.require, 
            gameClient, 
            songClient,
        async (req, res, next) => {

            const { songId, country } = req.body;
            const gameId = req.game.id;

            const entries = await leaderboard.getBoard(songId, gameId, Number(country));

            return res.uenc({
                ...uenc.setIndex(entries),
                count: entries.length,
                startingRank: 1
            });

        });
    }
}