const Joi = require("joi");
const uuid = require("uuid");
const utils = require("utils");
const nas = require("nas-token-client");

module.exports = {

    name: `DancerCard`,
    description: `Keeps data of dancer profiles.`,
    version: `1.0.0`,

    async init(app, router) {

        const dancercard = require("dancercard");
        
        /**
         * This middleware validates any new or to be updated dancercard's stats
         * so that we can avoid people from trying to go out of game's limits.
         */
        async function validateStats(req, res, next) {
            if (!req.game || !req.game.stats) 
                return next({
                    status: 400,
                    message: `A game must be assigned to validate stats!`
                });
            
            let stats = req.game.stats;

            const statsSchema = Joi.object({
                songsPlayed: Joi.number().min(0).max(stats.songsCount).required(),
                stars: Joi.number().min(0).max(stats.totalStars).required(),
                unlocks: Joi.number().min(0).max(stats.unlocksCount).required(),
                wdfRank: Joi.number().min(global.gs.MIN_WDF_LEVEL).max(global.gs.MAX_WDF_LEVEL).required()
            }).unknown(true);

            try {
                await statsSchema.validateAsync(req.body);
                return next();
            }
            catch(err) {
                // POSSIBLE CHEAT?
                return next({
                    status: 400,
                    message: `Can't validate Dancercard stats!`,
                    error: err.message
                });
            }
        };
        
        router.post("/RequestDancerProfile", nas.dev, async (req, res) => {
            let id = req.query.profileId;
            let profile = await dancercard.get({ profileId: id });

            return res.send({ profile });
        });

        router.post("/RequestDancerProfiles", nas.dev, async (req, res, next) => {
            let ids = req.query.profileIds || "";
            let profiles = await dancercard.getMany({ profileId: (ids.split(",") || []) });

            return res.send({ profiles });
        });

        /**
         * UploadDancerProfile upserts given profile data in body to database.
         */
        router.post("/UploadDancerProfile", nas.require, validateStats, async (req, res, next) => {
            
            // First step is to check whether client's account exists.
            const {
                avatar, country, name, 
                songsPlayed, stars, unlocks, wdfRank
            } = req.body;

            const userId = req.uid;
            const mac = req.mac;

            // If client doesn't have a profile entry, create a new profile
            // but if client has a profile, update it with data from body
            const profileExists = await dancercard.exists({ userId, mac });

            // Profile doesn't exist, create one
            if (!profileExists) {
                try {
                    const profileId = uuid.v4();
                    const profileEntry = await dancercard.new({
                        profileId, userId, mac,
                        avatar, country, name,
                        songsPlayed, stars, unlocks, wdfRank
                    });
                    global.logger.info(`Created Dancercard of '${name}' from '${country}' / UserId: ${userId}`);
                    
                    if (utils.isDev())
                        return res.status(200).json(profileEntry);
                
                    return res.status(200).send();
                }
                catch(err) {
                    return next({
                        status: 500,
                        message: `Error while trying to create a profile.`,
                        error: err.message
                    });
                }
            }

            // Profile exists, update profile by client's body.
            else if (profileExists) {

                // We must remove any sensitive data that shouldn't be modified from body
                ["_id", "userId", "profileId"].forEach(k => { delete req.body[k]; });

                try {
                    const updatedProfile = await dancercard.update({ userId, mac }, req.body);
                    global.logger.info(`Updated Dancercard of '${name}' from '${country}' / UserId: ${userId}`);
                    
                    if (utils.isDev())
                        return res.send(updatedProfile);
                    
                    return res.status(200).send();
                }
                catch(err) {
                    return next({
                        status: 500,
                        message: `Error while trying to update profile.`,
                        error: err.message
                    });
                }
            }

        });
    }
}