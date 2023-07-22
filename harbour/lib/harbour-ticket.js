const jwt = require("jsonwebtoken");

class HarbourTicket {
    constructor() {
        this.config = global.config.SECRETS.harbour;
    }

    sign(payload) {
        return jwt.sign(payload, this.config.secret, this.config.options);
    }

    verify(ticket) {
        return jwt.verify(ticket, this.config.secret);
    }
};

module.exports = new HarbourTicket();