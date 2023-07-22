const Joi = require("joi");

const avatar =  Joi.number().min(0).max(9999).required();
const country = Joi.number().required();
const songId = Joi.string().required();
const playerName = Joi.string().regex(global.gs.NAME_REGEX).required();
const skuName = Joi.string().valid("NCSA", "EMEA").required();
const lang = Joi.string().required();

module.exports = {
    Leaderboard: {
        getWorldWideLeaderBoard: {
            body: {
                songId
            }
        },
        getCountryLeaderBoard: {
            body: {
                country,
                songId
            }
        }
    },
    DancerCard: {
        UploadDancerProfile: {
            body: {
                avatar,
                country,
                name: playerName,
                songsPlayed: Joi.number().required(),
                stars: Joi.number().required(),
                unlocks: Joi.number().required(),
                wdfRank: Joi.number().required()
            }
        }
    },
    Mashup: {
        getMetadata: {
            body: {
                skuName
            }
        }
    },
    StarChallenge: {
        getCommonData: {
            body: {
                lang
            }
        }
    },
    HighScores: {
        // uploadMyScore handles validation by it's own because of multi part body
        // uploadMyScore: { body: {} }
    }
}