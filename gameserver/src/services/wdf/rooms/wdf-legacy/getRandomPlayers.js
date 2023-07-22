const Session = require("wdf-session");
const uenc = require("uenc");

module.exports = {

    name: `getRandomPlayers`,
    description: ``,
    version: `1.0.0`,

    async init(req, res, next) {

        try {
            const { nr_players, player_sid, sid_list, follow_sid } = req.body;

            const session = new Session(req.game.version, req.ip);

            const userCache = await session.getSessionCache(req.sid);
            if (!userCache)
                return next({
                    status: 401,
                    message: "No session!"
                });

            const query = {
                userId: req.uid,
                sessionId: req.sid,
                game: {
                    id: req.game.id,
                    version: req.game.version
                },
                profile: userCache
            };

            let userSession = await session.getSession(req.sid);
            // User doesn't have a session, create one and join to a lobby
            if (!userSession) {
                // if "follow_sid" is given, it means player is requesting to join specific session's lobby
                if (follow_sid) {
                    const sidSession = await session.getSession(follow_sid);
                    
                    if (!sidSession) return next({
                        status: 400,
                        message: `${follow_sid} does not have a session, cant join their lobby!`
                    });

                    const { lobbyId } = sidSession;
                    if (!await session.isLobbyAvailable(lobbyId)) return next({
                        status: 400,
                        message: `The lobby you're trying to enter is empty.`
                    });

                    userSession = await session.newSession(query, lobbyId);
                }
                else {
                    userSession = await session.newSession(query);
                    global.logger.info(`${req.uid} // ${req.game.version} - ${req.game.id} // ${userSession.profile.name} created session and joined lobby ${userSession.lobbyId}`);
                }
            };

            const lobbyId = userSession.lobbyId;
            const lobbyData = await session.getLobby(lobbyId);
            const lobbySessions = lobbyData.sessions.filter(sid => sid !== req.sid);

            const sessions = await session.getManySessions({
                sessionId: lobbySessions
            });
            const sessionsMap = sessions.map(p => {
                return {
                    sid: p.sessionId,
                    name: p.profile.name,
                    pays: p.profile.country,
                    avatar: p.profile.avatar,
                    onlinescore: p.profile.rank,
                }
            });

            await session.pingSession(req.sid);
            return res.uenc({
                player_name: userSession.profile.name,

                ...uenc.setIndex(sessionsMap),

                nr_players: sessions.length,
                nr_asked: nr_players,

                count: await session.sessionCount()
            });
        }
        catch (err) {
            return next({
                status: 500,
                message: `Can't get random players: ${err}`,
                error: err.message
            });
        }
    }
}