const Joi = require("joi");
const schemas = require("./http-schema");

module.exports = (schemaName) => {
    return async (req, res, next) => {

        let schema = schemas[schemaName]
        if (!schema) return next({
            status: 400,
            message: `Unknown schema`
        });
        schema = Joi.object(schema).unknown(true);

        try {
            await schema.validateAsync(req.body);
            return next();
        }
        catch(err) {
            return next({
                status: 400,
                message: `Invalid request`,
                error: err.message
            });
        }
    }
}