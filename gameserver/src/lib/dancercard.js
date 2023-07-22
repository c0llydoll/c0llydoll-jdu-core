const Joi = require("joi");
const mongoose = require("mongoose");

const utils = require("utils");

class DancerCard {
    constructor() {
        this.db = require("./models/dancercard");
        this.schema = Joi.object({
            profileId: Joi.string().guid().required(),
            userId: Joi.string().required(),
            mac: Joi.string().required(),
            avatar: Joi.number().min(0).max(9999).required(),
            country: Joi.number().min(0).max(9999).default(9627).required(),
            name: Joi.string().regex(global.gs.NAME_REGEX).custom(utils.profane, 'profanity check').required(),
            songsPlayed: Joi.number().required(),
            stars: Joi.number().required(),
            unlocks: Joi.number().required(),
            wdfRank: Joi.number().required()
        });
    }

    async new(data) {
        try {
            const value = await this.schema.validateAsync(data);
            const entry = new this.db(value);
            return await entry.save();
        }
        catch (err) {
            throw new Error(`Can't create Dancercard: ${err}`);
        };
    };

    async get(filter) {
        try {
            return await this.db.findOne(filter);
        }
        catch (err) {
            throw new Error(`Can't get Dancercard with ${JSON.stringify(filter)}: ${err}`);
        }
    }

    async getMany(filter) {
        try {
            return await this.db.find(filter);
        }
        catch (err) {
            throw new Error(`Can't get many Dancercards with ${JSON.stringify(filter)}: ${err}`);
        }
    }

    async update(toUpdate, data) {
        try {
            return await this.db.findOneAndUpdate(toUpdate, data);
        }
        catch (err) {
            throw new Error(`Can't update Dancercard with ${JSON.stringify(toUpdate)} // ${JSON.stringify(data)}: ${err}`);
        }
    }

    async delete(filter) {
        try {
            return await this.db.deleteOne(filter);
        }
        catch (err) {
            throw new Error(`Can't delete Dancercard with ${JSON.stringify(filter)}: ${err}`);
        }
    }

    async deleteMany(filter) {
        try {
            return await this.db.deleteMany(filter);
        }
        catch (err) {
            throw new Error(`Can't delete many Dancercards with ${JSON.stringify(filter)}: ${err}`);
        }
    }

    async exists(filter) {
        return await this.db.exists(filter) ? true : false;
    }
};

module.exports = new DancerCard();