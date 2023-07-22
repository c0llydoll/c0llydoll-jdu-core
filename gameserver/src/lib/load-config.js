const Joi = require("joi");
const fs = require("fs");
const path = require("path");

const service = Joi.object().keys({
    id: Joi.string().required(),
    name: Joi.string().required(),
    path: Joi.string().required(),
    clients: Joi.array().required(),
    isWdf: Joi.boolean().default(false)
});

const lang = Joi.object().keys({
    id: Joi.string().required(),
    lang: Joi.string().required(),
});

const region = Joi.object().keys({
    id: Joi.string().required(),
    region: Joi.string().required(),
})

const gs = Joi
    .object()
    .keys({
        GAMES: Joi.array().required(),
        SECRETS: Joi.object().required(),
        DATABASE: Joi.object().required(),
        SERVICES: Joi.object().pattern(/^/, service).required(),
        LANGS: Joi.array().items(lang).required(),
        REGIONS: Joi.array().items(region).required()
    }).unknown(true);

module.exports.gs = () => {
    const gsConfig = require("../config");
  
    const gsVal = gs.validate(gsConfig);
    if (gsVal.error) 
        throw new Error(`Couldn't verify Gameserver config: ${gsVal.error}`);

    return gsVal.value;
};

module.exports.service = (service) => {
    const confPath = path.resolve(service.base, "config.js");
    
    if (!fs.existsSync(confPath)) 
        throw new Error("Service doesn't have a config file, please create one!");

    const serviceConfig = require(confPath);
    return serviceConfig;
};