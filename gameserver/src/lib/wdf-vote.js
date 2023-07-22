const Joi = require("joi");

const games = require("games");
const cache = require("cache");

class Vote {
    constructor(version) {
        this.version = version;
        if (!games.isGameAvailable(this.version))
            throw new Error(`${version} is not available for use!`);
        
        this.cacheKey = `wdf-vote:${this.version}`;
    }

    async registerVote(sid, songId) {
        const data = await cache.get(this.cacheKey);
        const object = { sid, songId };

        // Don't allow sid to vote more than once
        const userAlreadyVoted = data.some(e => e.sid == sid);
        if (userAlreadyVoted) return;

        if (!data)
            await cache.set(this.cacheKey, [object]);
        else {
            data.push(object);
            await cache.set(this.cacheKey, data);
        }
        return;
    }

    async getVotes() {
        return await cache.get(this.cacheKey);
    }

    async getResults() {
        const votes = await this.getVotes();
        if (!votes) return;

        console.log(votes)
        const counts = votes.reduce((res, { songId }) => {
            if (res[songId]) res[songId]++
            else res[songId] = 1;
            return res;
        }, {});

        const percentages = Object.entries(counts).reduce((res, [songId, count]) => {
            res[songId] = count / votes.length;
            return res;
        }, {});

        return percentages
    }

    async resetVotes() {
        await cache.set(this.cacheKey, null);
        return;
    }
};

module.exports = Vote;