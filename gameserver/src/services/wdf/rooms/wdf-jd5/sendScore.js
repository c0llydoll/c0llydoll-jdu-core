const utils = require("wdf-utils");

const Session = require("wdf-session");
const Scores = require("wdf-score");
const cache = require("cache");

/**
 * "sendScore" is where player sends their score to the WDF and we upsert the score to DB.
 * If user joined WDF, this is where we create their session.
 */
module.exports = {
    name: `sendScore`,
    description: ``,
    version: `1.0.0`,

    async init(req, res, next) {

        try {
            const { song_id, score, stars, themeindex, coachindex, lastmove, total_score, sid } = req.body;

            const session = new Session(req.version, req.ip);
            const scores = new Scores(req.version);

            const userCache = req.cache;
            const sessionId = userCache.sessionId;

            let userSession = await session.getSession(sessionId);
            // User does not have a session create it.
            if (!userSession) {
                userSession = await session.newSession({
                    userId: userCache.userId,
                    sessionId: sessionId,
                    game: {
                        id: userCache.game.id,
                        version: userCache.game.version
                    },
                    profile: {
                        avatar: userCache.avatar,
                        name: userCache.name,
                        country: userCache.country,
                        rank: userCache.rank
                    }
                });
                global.logger.info(`${userCache.userId} // ${userCache.game.version} - ${userCache.game.id} // ${userSession.profile.name} created session and joined WDF!`);
            }

            const count = await session.sessionCount();
            const total = await scores.scoreCount();

            // Save client score to database
            const userScore = await scores.updateScore(sid, {
                userId: userCache.userId,
                sessionId: userCache.sid,
                game: userCache.game,
                profile: userSession.profile,
                coachIndex: coachindex,
                lastMove: lastmove,
                score: score,
                stars: stars,
                themeIndex: themeindex,
                totalScore: total_score
            });
            const userRank = await scores.getRank(sid);

            const { themeResults } = await scores.getThemeAndCoachResult();

            await session.pingSession(sid);
            return res.uenc({
                num: 0,
                count,
                total,
                score,
                rank: userRank,

                ...themeResults,

                t: utils.serverTime()
            });
        }
        catch (err) {
            console.error(err)
            return next({
                status: 500,
                message: `Can't send score: ${err}`,
                error: err.message
            });
        }
    }
}