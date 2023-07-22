const Joi = require("joi");
const uuid = require("uuid");

const utils = require("utils");

const games = require("games");
const cheatDetection = require("cheat-detection");
const cache = require("cache");

const Score = require("wdf-score");

class Session {
    constructor(version, ip) {
        if (!games.isGameAvailable(version))
            throw new Error(`${version} is not available for use!`);
        
        this.version = version;
        this.game = games.getGameByVersion(version);
        
        this.ip = ip;
        this.ipAuth = this.game.isJD5 || this.game.isJD15;
        this.score = new Score(version);

        this.db = require("./models/session");

        // Session validation
        this.schema = Joi.object({
            userId: Joi.string().required(),
            sessionId: Joi.string().required(),
            lobbyId: this.game.isJD5 ? Joi.string().optional() : Joi.string().guid().required(),
            game: Joi.object({
                id: Joi.string().required(),
                version: Joi.number().required()
            }).required(),
            profile: Joi.object({
                avatar: Joi.number().required(),
                name: Joi.string().regex(global.gs.NAME_REGEX).custom(utils.profane, 'profanity check').required(),
                rank: Joi.number().required(),
                country: Joi.number().required(),
            }).unknown(true).required(),
            ip: Joi.string().optional(),
            isBot: Joi.boolean().default(false),
            isJD5: Joi.boolean().default(this.game.isJD5 || false)
        }).unknown(true);

        // Cache validation
        this.cacheSchema = Joi.object({
            avatar: Joi.number().required(),
            name: Joi.string().regex(global.gs.NAME_REGEX).custom(utils.profane, 'profanity check').required(),
            rank: Joi.number().required(),
            country: Joi.number().required(),
            ip: Joi.string().optional(),
            isJD5: Joi.boolean().default(this.game.isJD5 || false)
        }).unknown(true);

        this.maxLobbyPlayers = global.gs.MAX_LOBBY_PLAYERS;

        // Lobby finder pipeline
        this.pipeline = [{
                $group: {
                    _id: "$lobbyId",
                    sessions: { $push: "$sessionId" }
                }
            },
            {
                $match: {
                    [`sessions.${this.maxLobbyPlayers-1}`]: {
                        $exists: false
                    }
                }
        }];
        this.baseQuery = {
            "game.version": this.version
        };
        this.cacheKey = !this.game.isJD5 ? `wdf-player-cache:${this.version}` : `wdf-player-cache`
    }
    
    /**
     * Sessions
     * 
     * Sessions are handled in database, and pinged constantly by session-client
     * if a player hasn't pinged in certain time, their session gets erased
     * which automatically removes from their lobby too
     */

    /**
     * Creates a new session
     * @param {Object} data Session object, usually created with connectToWDF
     * @param {String} forcedLobbyId Lobby ID to forcefully join the session to
     * @returns
     */
    async newSession(data, forcedLobbyId) {
        try {
            const { sessionId } = data;

            // If game isn't JD5, join user to a lobby
            if (!this.game.isJD5) {
                // If a forced lobby ID was given, join user to that lobby
                if (forcedLobbyId) data.lobbyId = forcedLobbyId;
                // If not, join user to an available lobby
                else {
                    const lobbyId = await this.joinLobby(sessionId);
                    data.lobbyId = lobbyId;
                }
            };
            // If game is IP authorized, append given IP to session
            if (this.ipAuth && this.ip) {
                data.ip = this.ip;
            };

            const value = await this.schema.validateAsync(data);
            const entry = new this.db(value);
            const saved = await entry.save();
            return saved;
        }
        catch (err) {
            throw new Error(`Can't create Session: ${err}`);
        };
    }

    async getSession(sessionId) {
        try {
            const session = await this.db.findOne({ ...this.baseQuery, sessionId });

            // If game is IP authorized but found session IP is not equal to given IP
            // we return null so that clients who calls this can't return http error to client.
            if (session && this.ipAuth && this.ip && session.ip !== this.ip) {
                global.logger.warn(`${this.ip} tried to access session of ${sessionId}!`);
                return;
            }
            
            return session;
        }
        catch (err) {
            throw new Error(`Can't get Session with ${sessionId}: ${err}`);
        }
    }

    async getOtherSession(sessionId) {
        try {
            const session = await this.db.findOne({ ...this.baseQuery, sessionId });
            return session;
        }
        catch (err) {
            throw new Error(`Can't get Session with ${sessionId}: ${err}`);
        }
    }

    async getManySessions(filter) {
        try {
            return await this.db.find({ ...filter, "game.version": this.version });
        }
        catch (err) {
            throw new Error(`Can't get many Sessions with ${JSON.stringify(filter)}: ${err}`);
        }
    }

    /**
     * Deletes session and any score entries by player
     * @param {*} sessionId 
     * @returns 
     */
    async deleteSession(sessionId) {
        try {
            const query = { ...this.baseQuery, sessionId };

            // Check if session actually exists before hand
            const session = await this.getSession(sessionId);
            if (!session) return;
            
            // Delete session, score entries and cache
            await this.db.deleteMany(query);
            await this.score.deleteScore(query);
            await this.deleteSessionCache(sessionId);
            return;
        }
        catch (err) {
            throw new Error(`Can't delete Session with ${sessionId}: ${err}`);
        }
    }

    async deleteManySessions(filter) {
        try {
            return await this.db.deleteMany({ "game.version": this.version, ...filter });
        }
        catch (err) {
            throw new Error(`Can't delete many Sessions with ${JSON.stringify(filter)}: ${err}`);
        }
    }

    async updateLevel(sessionId, rank) {
        try {
            const query = { ...this.baseQuery, sessionId };
            const toUpdate = { "profile.rank": rank };
            
            // Check if session actually exists before hand
            const session = await this.getSession(sessionId);
            if (!session) return;

            return await this.db.findOneAndUpdate(query, toUpdate);
        }
        catch (err) {
            throw new Error(`Can't update WDF level of ${sessionId} / rank: ${rank}: ${err}`);
        };
    }

    async pingSession(sessionId) {
        try {
            const query = { ...this.baseQuery, sessionId };
            const toUpdate = { updatedAt: new Date() };
            return await this.db.findOneAndUpdate(query, toUpdate);
        }
        catch (err) {
            throw new Error(`Can't ping Session with ${this.version} - ${sessionId}: ${err}`);
        }
    }

    async randomSession(amount = 1, excludeSid) {
        try {
            return await this.db.aggregate([
                { $match: { ...this.baseQuery, sessionId: { $ne: excludeSid } } }, 
                {  $sample: { size: amount }  }
            ])
        }
        catch(err) {
            throw new Error(`Can't get random sessions with amount ${amount}: ${err}`);
        }
    }

    async sessionCount() {
        return await this.db.count(this.baseQuery)
    }

    async createSessionCache(sessionId, data) {
        try {
            // Validate session object
            const value = await this.cacheSchema.validateAsync(data);
            return await cache.set(`${this.cacheKey}:${sessionId}`, value, global.gs.TOKEN_EXPIRATION);
        }
        catch(err) {
            throw new Error(`Can't create session cache for ${sessionId}: ${err}`);
        }
    }

    async getSessionCache(sessionId) {
        try {
            const sessionCache = await cache.get(`${this.cacheKey}:${sessionId}`);
    
            // If game is IP authorized but found cache IP is not equal to given IP
            // we return null so that clients who calls this can't return http error to client.
            if (this.ipAuth && this.ip && sessionCache.ip !== this.ip)
                return;
            
            return sessionCache;
        }
        catch(err) {
            throw new Error(`Can't get session cache for ${sessionId}: ${err}`);
        }
    }

    async deleteSessionCache(sessionId) {
        try {
            const sessionCache = await this.getSessionCache(sessionId);
            if (!sessionCache) return;

            return await cache.set(`${this.cacheKey}:${sessionId}`, null);
        }
        catch(err) {
            throw new Error(`Can't delete session cache for ${sessionId}: ${err}`);
        }
    }
    
    /**
     * Lobbies
     * 
     * Lobbies are no longer seperate documents, when a player joins WDF
     * the server groups all players and their lobbyIds and create a lobby like that
     * and then find an empty one for client and append that lobby's id to their session
     * {
     *  sessionId: 22,
     *  lobbyId: 45056
     * }
     * would be grouped like
     * {
     *  _id: 45056,
     *  sessions: [22]
     * }
     * creating lobbies internally only
     */

    async getLobby(lobbyId) {
        const result = await this.db.aggregate([
            {
                $match: this.baseQuery
            },
            {
                $group: {
                    _id: "$lobbyId",
                    sessions: { $push: "$sessionId" }
                }
            },
            {
                $match: { _id: lobbyId }
            }
        ]);
        if (result && result[0]) return result[0];
        else return null;
    }
    
    async getLobbies() {
        const result = await this.db.aggregate([
            {
                $match: this.baseQuery
            },
            {
                $group: {
                    _id: "$lobbyId",
                    sessions: { $push: "$sessionId" }
                }
            }
        ]);
        return result;
    }
    
    async findAvailableLobby() {
        const result = await this.db.aggregate([
            {
                $match: this.baseQuery
            },
            ...this.pipeline,
            // Sort by highest session so that player joins the most crowded lobby
            {   
                $sort: { "sessions": 1 }
            }
        ]);
        if (result && result[0]) return result[0];
        else return null;
    }

    async isLobbyAvailable(lobbyId) {
        const lobbies = await this.getLobbies();
        const result = lobbies.filter(l => l._id === lobbyId);
        if (!result || !result[0]) return false;

        if (result[0].sessions.length < this.maxLobbyPlayers) return true;
        return false;
    }

    async joinLobby(sessionId) {
        let lobbyId;
        let availableLobby = await this.findAvailableLobby();
        
        // If there's an available lobby, set the lobbyId
        // else, we create a new lobby so generate a new ID
        if (availableLobby)
            lobbyId = availableLobby["_id"];
        else lobbyId = uuid.v4();

        return lobbyId;
    }

    /** */

    async exists(sessionId) {
        return await this.db.exists({
            ...this.baseQuery,
            sessionId
        }) ? true : false;
    }

    async canUserConnect(userId) {
        const isBanned = await cheatDetection.isUserBanned(userId);
        return !isBanned;
    }

    async getCountryPlayers(country) {
        return await this.db.count({
            ...this.baseQuery,
            "profile.country": country
        });
    }

    /** */
}

module.exports = Session;