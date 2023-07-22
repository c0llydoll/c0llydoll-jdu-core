const Joi = require("joi")

const utils = require("../src/lib/utils")
const method = (value, helpers) => {
    if (utils.profanity.isProfane(value)) {
        throw new Error(`"${value}" is not an allowed word!`);
    }
    return value;
}

const schema = Joi.object({
    name: Joi.string().custom(method, 'profane check').required()
});

const { value, error } = schema.validate({
    name: "yunass"
})

console.log(value, error)