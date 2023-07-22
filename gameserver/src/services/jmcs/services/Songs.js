const fs = require("fs");
const Joi = require("joi");

const songs = require("songs");

module.exports = {

    name: `SongDB`,
    description: `Handles all WDF routes for JD2015-2018`,
    version: `1.0.0`,

    async init(app, router, config) {

        router.get("/getSongs", async (req, res, next) => {
            let filter = JSON.parse(req.query.filter || "{}");
            return res.send(
                await songs.getMany(filter)
            );
        });

        router.get("/getSongs/:idOrMapName", async (req, res, next) => {
            let idOrMapName = req.params.idOrMapName;
            return res.send(
                await songs.get({
                    $or: [{ mapName: idOrMapName }, { songId: idOrMapName }]
                })
            );
        });

        router.post("/random", async (req, res, next) => {
            
            let schema = Joi.object().keys({
                version: Joi.number().required(),
                exclude: Joi.array().default([]),
                filters: Joi.object().default({}),
                amount: Joi.number().default(3)
            });

            let { value, error } = schema.validate(req.body);
            if (error) return next({
                status: 400,
                message: `Can't validate body`,
                error: error.message
            });

            let { version, exclude, filters, amount } = value;
            let result = await songs.db.aggregate([
                {
                    $match: {
                        version,
                        mapName: { $nin: exclude },
                        songId: { $nin: exclude },
                        ...filters
                    }
                }, {
                    $sample: { size: amount }
                }
            ]);

            return res.json(result);
        });

    }
}