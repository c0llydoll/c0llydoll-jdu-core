const Joi = require("joi");

const uenc = require("uenc");
const utils = require("wdf-utils");

const Session = require("wdf-session");
const sessionClient = require("wdf-session-client");
const Score = require("wdf-score");

module.exports = {

    name: `getPlayerScores`,
    description: ``,
    version: `1.0.0`,

    async init(req, res, next) {

        try {
            let { event, _sid, sid_list, send_score } = req.body;
            event = decodeURIComponent(event);

            const session = new Session(req.game.version);
            const scores = new Score(req.game.version);

            const userSession = await session.getSession(req.sid);
            const userCache = await session.getSessionCache(req.sid);
            const count = await session.sessionCount();
            const total = await scores.scoreCount();

            const { themeResults, isCoach } = await scores.getThemeAndCoachResult();

            if (!userCache)
                return next({
                    status: 401,
                    message: "No session!"
                });

            const t = utils.serverTime();

            let result = {
                num: 1,
                t,
                count
            };

            // If user does not have a session, only send num, t and count
            if (!userSession)
                return res.uenc(result);

            const lobbyId = userSession.lobbyId;
            const lobbyData = await session.getLobby(lobbyId);
            const lobbySessions = lobbyData.sessions;
            const num = lobbySessions.length + 1;

            // "sid_list" is not empty, so include score data of given sids in response
            if (sid_list.length > 0) {

                const sids = sid_list.filter(sid => sid !== req.sid); // Exclude client's sid if given
                const mappedScores = [];

                // Loop through all sids in sid_list
                // - If sid is in lobby, but has no scory entry, their score will be 0 and rank = count (so they are last)
                // - If sid is not in lobby, show their score as -1 and rank as 1 so that the game removes them from list (visually)
                // s - sessionId
                // sc - score
                // r - rank
                // e - event
                // c - coach index
                // o - online rank
                for (let i = 0; i < sids.length; i++) {

                    const sid = sids[i];
                    const rank = await scores.getRank(sid);
                    const sessionData = await session.getOtherSession(sid);
                    const scoreData = await scores.getScore(sid);
                    const isInLobby = lobbySessions.some(s => s === sid);

                    // "sid" is not in lobby or does not have session
                    if (!isInLobby || !sessionData) {
                        mappedScores.push({
                            s: sid,
                            sc: -1,
                            r: 1
                        });
                        continue;
                    }

                    // "sid" is in lobby but does not have score data
                    // their score will be 0 and will be placed last in ranking
                    if (!scoreData) {
                        mappedScores.push({
                            s: sid,
                            sc: 0,
                            r: count,
                            e: "",
                            c: 0,
                            o: sessionData.profile.rank
                        });
                        continue;
                    }

                    // "sid" is in lobby & has session & has score entry, now it's okay to push their score
                    mappedScores.push({
                        s: sid,
                        sc: scoreData.totalScore,
                        r: rank,
                        e: scoreData.event,
                        c: isCoach ? scoreData.coachIndex : scoreData.themeIndex,
                        o: scoreData.profile.rank
                    });
                }

                result = {
                    ...uenc.setIndex(mappedScores, 1, "_"),
                    num,
                    t,
                    count
                };
            }

            // If send score is enabled, it means player will send scores
            // so verify their score data first and then save the data to database
            if (send_score) {
                const schema = Joi.object({
                    coachindex: Joi.number().min(0).max(3).optional(),
                    lastmove: Joi.boolean().truthy('1').falsy('0').optional(),
                    score: Joi.number().optional(),
                    song_id: Joi.string().optional(),
                    stars: Joi.number().min(0).max(req.game.maxStars).optional(),
                    themeindex: Joi.number().min(0).max(3).optional(),
                    total_score: Joi.number().min(0).max(global.gs.MAX_SCORE).optional()
                }).unknown(true);

                // Validate score data
                const { error, value } = schema.validate(req.body);
                if (error) return next({
                    status: 400,
                    message: `Can't validate data`,
                    error: error.message
                });

                const {
                    coachindex, lastmove, score,
                    song_id, stars, themeindex,
                    total_score
                } = value;

                // Upsert user's score to database
                const userScore = await scores.updateScore(req.sid, {
                    userId: req.uid,
                    sessionId: req.sid,
                    game: { id: req.game.id, version: req.game.version },
                    profile: userSession.profile,
                    coachIndex: coachindex,
                    event: event,
                    lastMove: lastmove,
                    score: score,
                    sendScore: send_score,
                    stars: stars,
                    themeIndex: themeindex,
                    totalScore: total_score
                });
                const userRank = await scores.getRank(req.sid);

                result = {
                    ...result, // if sid list data is given...
                    num,
                    t,
                    score: total_score,
                    rank: userRank,
                    count,
                    total,
                    ...themeResults
                }
            }

            await session.pingSession(req.sid);
            return res.uenc(result);
        }
        catch (err) {
            return next({
                status: 500,
                message: `Can't get player scores: ${err}`,
                error: err.message
            });
        }
    }
}