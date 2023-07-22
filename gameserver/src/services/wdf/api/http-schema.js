const Joi = require("joi");

const version = Joi.number().required();

module.exports = {
    createBots: {
        amount: Joi.number().min(1).required(),
        version
    },
    deleteBots: {
        version
    },
    sessionsStatus: {
        version
    }
};