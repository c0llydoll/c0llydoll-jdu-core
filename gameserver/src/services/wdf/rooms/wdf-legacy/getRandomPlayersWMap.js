const Session = require("wdf-session");
const uenc = require("uenc");

const cache = require("cache");

module.exports = {

    name: `getServerTime`,
    description: ``,
    version: `1.0.0`,

    async init(req, res, next) {

        try {
            const { nr_players, player_sid, sid_list } = req.body;

            const session = new Session(req.game.version);
            const sessionId = req.sid;

            const userCache = await session.getSessionCache(sessionId);

            // Fetch random sessions, but exclude player's sid from list
            const sessions = await session.randomSession(nr_players, req.sid);
            const sessionsMap = sessions.map(p => {
                return {
                    sid: p.sessionId,
                    name: p.profile.name,
                    pays: p.profile.country,
                    avatar: p.profile.avatar,
                    onlinescore: p.profile.rank,
                }
            });

            return res.uenc({
                player_name: userCache.name,

                ...uenc.setIndex(sessionsMap),

                nr_players: sessions.length,
                nr_asked: nr_players,

                count: await session.sessionCount()
            });
        }
        catch (err) {
            console.error(err)
            return next({
                status: 500,
                message: `Can't get random players for backstage: ${err}`,
                error: err.message
            });
        }
    }
}