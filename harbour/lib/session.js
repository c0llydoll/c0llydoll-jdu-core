const cache = require("./cache");

class Session {
    constructor() {
        this.keys = {
            session: `harbour-session:`
        };
    };

    async newSession(sessionId, data, expiration) {
        const sessionExists = this.sessionExists(sessionId);
        if (sessionExists) await this.deleteSession(sessionId);

        return await cache.set(`harbour-session:${sessionId}`, data, expiration);
    }

    async getSession(sessionId) {
        const sessionExists = this.sessionExists(sessionId);
        if (!sessionExists) return;

        const session = await cache.get(`harbour-session:${sessionId}`);
        return session;
    }

    async sessionExists(sessionId) {
        const session = await cache.get(`harbour-session:${sessionId}`);
        if (!session) return;
        return true;
    }

    async deleteSession(sessionId) {
        await cache.set(`harbour-session:${sessionId}`, null);
    }
};

module.exports = new Session();