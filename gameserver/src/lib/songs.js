const Joi = require("joi");
const mongoose = require("mongoose");

class Songs {
    constructor() {
        this.db = require("./models/song");
        this.schema = Joi.object({
            mapName: Joi.string().required(),
            title: Joi.string().required(),
            artist: Joi.number().required(),
            version: 2016,
            numCoach: Joi.number().min(1).max(6).required(),
            difficulty: Joi.number().min(1).max(4).required(),
            songId: Joi.number().required(),
            songHash: Joi.string().guid().required(),
            length: Joi.number().required(),
            isAvailable: Joi.boolean().required()
        });
    }

    async new(data) {
        try {
            const value = await this.schema.validateAsync(data);
            const entry = new this.db(value);
            return await entry.save();
        }
        catch (err) {
            throw new Error(`Can't create Song: ${err}`);
        };
    }

    async get(filter) {
        try {
            return await this.db.findOne(filter);
        }
        catch (err) {
            throw new Error(`Can't get Song with ${JSON.stringify(filter)}: ${err}`);
        }
    }

    async getMany(filter) {
        try {
            return await this.db.find(filter);
        }
        catch (err) {
            throw new Error(`Can't get many Songs with ${JSON.stringify(filter)}: ${err}`);
        }
    }

    async exists(idOrMapName) {
        return await this.db.exists({
            $or: [{ mapName: idOrMapName }, { songId: idOrMapName }]
        }) ? true : false;
    }

    /**
     * Returns random amount of maps
     * @param {Number} version Version of maps
     * @param {Number} amount Amount of random maps
     * @param {Array} excludeMaps Maps to not include
     * @param {Object} filters Filtering randomize
     * @returns {Array}
     */
    async random(version, amount = 1, excludeMaps = [], filters = {}) {
        return await this.db.aggregate([
            {
                $match: {
                    version,
                    isAvailable: true,
                    mapName: { $nin: excludeMaps },
                    songId: { $nin: excludeMaps },
                    ...filters
                }
            }, {
                $sample: { size: amount }
            }
        ]);
    }
};

module.exports = new Songs();