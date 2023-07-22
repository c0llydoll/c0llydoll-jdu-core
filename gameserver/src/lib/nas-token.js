const Joi = require("joi");
const crypto = require("crypto");

const payloadSchema = Joi
    .object()
    .keys({
        sid: Joi.string().required(), // NAS Session ID
        uid: Joi.string().required(), // User ID
        gid: Joi.string().required(), // Game ID
        mac: Joi.string().required(), // Wii MAC address
        exp: Joi.number().required(), // Token expiration
        // env: Joi.string().required(), // Enviroment
        // loc: Joi.string().required(), // Language
        // rgn: Joi.string().required() // Region
    })
    .unknown(false);

class NasToken {

    constructor() {
        this.secret = global.secrets.NAS_TOKEN;
        this.algorithm = this.secret.algorithm
        this.iv = Buffer.from(this.secret.iv, "hex")
        this.key = Buffer.from(this.secret.key, "hex")
    }

    validatePayload(payload) {
        const { value, error } = payloadSchema.validate(payload);
        if (error) throw new Error(`Can't validate token payload: ${error}`);
        return value;
    }

    decrypt(token = {}) {
        try {
            token = decodeURIComponent(token);
            token = Buffer.from(token, "base64").toString("hex");
            let buffer = Buffer.from(token, "hex");
        
            let decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
            let decrypted = decipher.update(buffer);
        
            decrypted = Buffer.concat([decrypted, decipher.final()]);
            decrypted = decrypted.toString();
            decrypted = JSON.parse(decrypted);
            decrypted = this.validatePayload(decrypted);
        
            return decrypted;
        }
        catch(err) {
            throw new Error(`Can't decrypt NAS token: ${err}`);
        }
    }

    encrypt(payload = {}) {
        try {
            payload = this.validatePayload(payload);
            payload = JSON.stringify(payload);
        
            let cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
            let token = cipher.update(payload);
        
            token = Buffer.concat([token, cipher.final()]);
            token = Buffer.from(token, "hex").toString("base64");
        
            return token;
        }
        catch(err) {
            throw new Error(`Can't encrypt NAS token: ${err}`);
        }
    }

}

module.exports = new NasToken();