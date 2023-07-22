const Joi = require("joi");

const games = require("games");

class Score {
    constructor(version) {
        this.version = version;
        if (!games.isGameAvailable(this.version))
            throw new Error(`${version} is not available for use!`);

        const Playlist = require("wdf-playlist");
        this.playlist = new Playlist(this.version);
        this.game = games.getGameByVersion(this.version);
        
        this.db = require("./models/wdf-score");
        const schema = Joi.object({
            userId: Joi.string().required(),
            sessionId: Joi.string().required(),
            game: Joi.object().required(),
            profile: Joi.object().required(),
            coachIndex: Joi.number().min(0).max(3).required(),
            event: Joi.string().required(),
            lastMove: Joi.boolean().truthy('1').falsy('0').required(),
            score: Joi.number().required(),
            sendScore: Joi.boolean().truthy('1').falsy('0').required(),
            stars: Joi.number().required(),
            themeIndex: Joi.number().required(),
            totalScore: Joi.number().min(0).max(global.gs.MAX_SCORE).required(),
            isBot: Joi.boolean().default(false)
        });
        const schema2014 = Joi.object({
            userId: Joi.string().required(),
            sessionId: Joi.string().required(),
            game: Joi.object().required(),
            profile: Joi.object().required(),
            coachIndex: Joi.number().min(0).max(3).required(),
            lastMove: Joi.boolean().truthy('1').falsy('0').required(),
            score: Joi.number().required(),
            stars: Joi.number().required(),
            themeIndex: Joi.number().required(),
            totalScore: Joi.number().min(0).max(global.gs.MAX_SCORE).required(),
            isBot: Joi.boolean().default(false)
        });
        this.schema = this.game.isJD5 ? schema2014 : schema;
        this.baseQuery = {
            "game.version": this.version
        };
    }

    async updateScore(sessionId, scoreData) {
        try {
            return await this.db.findOneAndUpdate({
                ...this.baseQuery,
                sessionId
            }, scoreData, { upsert: true });
        }
        catch (err) {
            throw new Error(`Can't upsert WDF Score: ${err}`);
        };
    }

    async updateRank(sessionId, rank) {
        try {
            return await this.db.findOneAndUpdate({ 
                ...this.baseQuery,
                sessionId
             }, { "profile.rank": rank });
        }
        catch (err) {
            throw new Error(`Can't update WDF rank of ${sessionId} / rank: ${rank}: ${err}`);
        };
    }

    async get(filter) {
        try {
            return await this.db.findOne(filter);
        }
        catch (err) {
            throw new Error(`Can't get WDF Score with ${JSON.stringify(filter)}: ${err}`);
        }
    }

    async getMany(filter) {
        try {
            return await this.db.find(filter);
        }
        catch (err) {
            throw new Error(`Can't get many WDF Scores with ${JSON.stringify(filter)}: ${err}`);
        }
    }

    async getScore(sessionId) {
        try {
            return await this.db.findOne({ ...this.baseQuery, sessionId });
        }
        catch (err) {
            throw new Error(`Can't get WDF Score for ${sessionId}: ${err}`);
        }
    }

    async deleteScore(filter) {
        try {
            return await this.db.deleteMany({ ...this.baseQuery, ...filter });
        }
        catch (err) {
            throw new Error(`Can't delete WDF Scores with ${JSON.stringify(filter)}: ${err}`);
        }
    }

    async resetScores() {
        try {
            return await this.db.deleteMany({
                ...this.baseQuery
            });
        }
        catch (err) {
            throw new Error(`Can't reset WDF Scores for ${version}: ${err}`);
        }
    }

    async exists(filter) {
        return await this.db.exists(filter) ? true : false;
    }

    async scoreCount() {
        return await this.db.count({ ...this.baseQuery }) || 0;
    }

    async getRank(sid) {
        const ranks = await this.getRanks();
        const result = ranks.filter(s => s.sessionId === sid);

        if (!result[0]) return null;
        return result[0].rank;
    }

    async getRanks(limit, excludeSid) {
        let pipeline = [
            { $match: { ...this.baseQuery, sessionId: { $ne: excludeSid } } },
            { $sort: { totalScore: -1 } },
            {
                $group: {
                    _id: false,
                    data: {
                        $push: "$$ROOT"
                    }
                }
            },
            {
                $unwind: {
                    path: "$data",
                    includeArrayIndex: "rank"
                }
            }
        ]
        if (limit) pipeline.push({
            $limit: limit
        });
        
        let ranks = await this.db.aggregate(pipeline);
        ranks = ranks.map(r => { 
            r.rank += 1; 
            r = { ...r.data, rank: r.rank }; 
            delete r.data; 
            return r; 
        });
        return ranks;
    }

    /**
     * Returns number of scores of given community id.
     * @param {Number} themeIndex 
     * @returns 
     */
    async getThemeResult(themeIndex = 0) {
        try {
            const entries = await this.db.find({
                ...this.baseQuery,
                themeIndex
            })
            let stars = 0;
            for (let i = 0; i < entries.length; i++) {
                const entry = entries[i];
                let starAmount = entry.totalScore / 2000;
                if (starAmount > 5) starAmount = 5;
                stars += parseInt(starAmount);
            }
            return (stars || 0) * 2000;
        }
        catch(err) {
            throw new Error(`Can't get theme results for ${this.version} index: ${themeIndex}: ${err}`)
        }
    }

    /**
     * Returns number of scores of given coach id.
     * @param {Number} coachIndex 
     * @returns
     */
    async getCoachResult(coachIndex = 0) {
        try {
            const entries = await this.db.find({
                ...this.baseQuery,
                coachIndex
            });
            let stars = 0;
            for (let i = 0; i < entries.length; i++) {
                const entry = entries[i];
                let starAmount = entry.totalScore / 2000;
                if (starAmount > 5) starAmount = 5;
                stars += parseInt(starAmount);
            }
            return (stars || 0) * 2000;
        }
        catch(err) {
            throw new Error(`Can't get coach results for ${this.version} index: ${coachIndex}: ${err}`)
        }
    }

    async getThemeAndCoachResult() {
        const currentTheme = await this.playlist.getCurrentTheme();
        const isCommunity = this.playlist.isThemeCommunity(currentTheme);
        const isCoach = this.playlist.isThemeCoach(currentTheme);

        let themeResults = {};
        let indexes = {
            theme: [
                await this.getThemeResult(0),
                await this.getThemeResult(1)
            ],
            coach: [
                await this.getCoachResult(0),
                await this.getCoachResult(1),
                await this.getCoachResult(2),
                await this.getCoachResult(3)
            ]
        };

        // Set final keys and values
        Object.keys(indexes).forEach(key => {
            let arr = indexes[key];
            arr.forEach((v, i) => {
                let k = `${key}${i}`;
                if (this.game.isJD5) k = "score_" + k;
                themeResults[k] = 0;
                if (isCommunity && key == "theme")
                    themeResults[k] = v;
                if (isCoach && key == "coach")
                    themeResults[k] = v;
            });
        });

        let winner = Object.keys(themeResults).reduce(function(a, b){ return themeResults[a] > themeResults[b] ? a : b });

        return {
            currentTheme,
            isCommunity,
            isCoach,
            themeResults,
            winner
        };
    }

    async getNumberOfWinners(results) {
        if (!results)
            throw new Error(`Theme result list required for winners`);
        
        // Get key with highest value from themecoach result and get it's index
        // (this is a dumb way, please make a better method in future)
        let key = Object.keys(results).reduce(function(a, b){ return results[a] > results[b] ? a : b });
        let index = Number(key.substring(5));
        let query = {};

        if (key.startsWith("coach"))
            query = { coachIndex: index };
        else if (key.startsWith("theme"))
            query = { themeIndex: index };
        
        return await this.db.count({ ...query, "game.version": this.version });
    }

    async getStarCount() {
        try {
            const entries = await this.db.find({
                "game.version": this.version
            });
            let stars = 0;
            for (let i = 0; i < entries.length; i++) {
                const entry = entries[i];
                let starAmount = entry.totalScore / 2000;
                if (starAmount > 5) starAmount = 5;
                stars += parseInt(starAmount);
            }
            return stars || 0;
        }
        catch(err) {
            throw new Error(`Can't get star count for ${this.version}: ${err}`)
        }
    }

};

module.exports = Score;