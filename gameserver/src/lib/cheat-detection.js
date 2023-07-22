class CheatDetection {
    constructor() {
        this.db = require("./models/cheaters");
    }

    async banUser(data) {
        try {
            const entry = new this.db(data);
            return await entry.save()
        }
        catch(err) {
            throw new Error(`Couldn't register cheat ${JSON.stringify(data)}: ${err}`)
        }
    }

    async isUserBanned(userId) {
        return await this.db.exists({ userId }) ? true : false;
    }
}

module.exports = new CheatDetection();