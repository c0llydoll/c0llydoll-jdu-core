const Joi = require("joi");
const dancercard = require("dancercard");

class Leaderboard {
    constructor() {
        this.db = require("./models/score");
        this.schema = Joi.object().keys({
            profileId: Joi.string().required(),
            userId: Joi.string().required(),
            mac: Joi.string().required(),
            userCountry: Joi.number().required(),
            coachId: Joi.number().min(0).max(3).required(),
            gameMode: Joi.number().required(),
            game: Joi.object().keys({
                id: Joi.string().required(),
                version: Joi.number().required()
            }).required(),
            songId: Joi.string().required(),
            score: Joi.number().min(0).max(global.gs.MAX_SCORE).required(),
            totalScore: Joi.number().min(0).max(1).required(),
            partialScores: Joi.binary().required()
        });
        this.maxResult = global.gs.MAX_LEADERBOARD_SIZE;
    }

    async newScore(data) {
        try {
            const value = await this.schema.validateAsync(data);
            const entry = new this.db(value);
            return await entry.save();
        }
        catch (err) {
            throw new Error(`Can't create Score: ${err}`);
        };
    }

    async getScore(filter) {
        try {
            return await this.db.findOne(filter);
        }
        catch (err) {
            throw new Error(`Can't get Score with ${JSON.stringify(filter)}: ${err}`);
        }
    }

    async getScores(filter) {
        try {
            return await this.db.find(filter);
        }
        catch (err) {
            throw new Error(`Can't get many Scores with ${JSON.stringify(filter)}: ${err}`);
        }
    }

    async deleteScore(filter) {
        try {
            return await this.db.deleteOne(filter);
        }
        catch (err) {
            throw new Error(`Can't delete Score with ${JSON.stringify(filter)}: ${err}`);
        }
    }

    async deleteScores(filter) {
        try {
            return await this.db.deleteMany(filter);
        }
        catch (err) {
            throw new Error(`Can't delete many Scores with ${JSON.stringify(filter)}: ${err}`);
        }
    }

    async createBoard(songId, version, country, limit) {

        // Filter by songId and gameId and country if provided (for regional boards)
        let match = {
            songId: { $eq: songId },
            "game.version": { $eq: version },
            createdAt: {
                $gt: new Date(Date.now() - global.gs.LEADERBOARD_RESET_INTERVAL) // only get 1 week old scores
            }
        };
        if (country) match.userCountry = { $eq: country };

        // Get data from db and sort by score
        const result = await this.db.aggregate([
            { $match: match },
            { $setWindowFields: { "partitionBy": "$profileId", "sortBy": { "totalScore": -1 }, "output": { "rank": { $rank: {} } } } },
            { $match: { rank: 1 } },
            { $unset: "rank" },
            { $sort: { totalScore: -1 } },
            { $limit: limit || this.maxResult }
        ]);
        
        return result || [];
    }

    async getBoard(songId, version, country, limit) {
        const board = await this.createBoard(songId, version, country, limit);

        let entries = [];
        for (let i = 0; i < board.length; i++) {

            const entry = board[i];
            const profile = await dancercard.get({ profileId: entry.profileId });
            if (!profile) continue;

            entries.push({
                avatar: profile.avatar,
                name: profile.name,
                country: profile.country,
                score: entry.totalScore
            });
        }

        return entries;
    }

    async getEntryCount(songId, version, country) {
        let query = {
            songId,
            "game.version": version
        }
        if (country) query.userCountry = country;
        return await this.db.count(query) || 0
    }
}

module.exports = new Leaderboard();