const Joi = require("joi")

const uenc = require("uenc")
const utils = require("wdf-utils");

const Session = require("wdf-session");
const Scores = require("wdf-score");

const cache = require("cache");

/**
 * getMyRank is for listing the top 10 users who scored the best in a WDF session
 */
module.exports = {

    name: `getMyRank`,
    description: `Serves rank status for top 10 players & client's score`,
    version: `1.0.0`,

    async init(req, res, next) {

        try {
            const { onlinescore, sid, song_id } = req.body;

            const session = new Session(req.version, req.ip);
            const scores = new Scores(req.version, req.ip);

            // User's leveled up their WDF level, update it
            // TODO: maybe have 1 function to updateLevel OR
            // remove profile from score and make session have it only
            await session.updateLevel(sid, onlinescore);

            const count = await session.sessionCount();
            const total = await scores.scoreCount();

            const userRank = await scores.getRank(sid);
            const userScore = await scores.getScore(sid);

            // Get theme results (coach/theme) and amount of winning side's player count
            const { themeResults } = await scores.getThemeAndCoachResult();
            const winners = await scores.getNumberOfWinners(themeResults);

            // Get top 30 scores
            const topTen = await scores.getRanks(global.gs.WORLD_RESULT_LIMIT_JD5);
            const entries = [];
            for (let i = 0; i < topTen.length; i++) {
                const entry = topTen[i];

                // If any of the top scores don't have a session don't include them
                // (which means they left wdf right before ranking)
                const entrySession = await session.getOtherSession(entry.sessionId);
                if (!entrySession) continue;

                entries.push({
                    sid: entry.sessionId,
                    score: entry.totalScore,
                    rank: entry.rank,
                    name: entrySession.profile.name,
                    pays: entrySession.profile.country,
                    avatar: entrySession.profile.avatar,
                    onlinescore: entrySession.profile.rank,
                });
            };

            return res.uenc({
                onlinescore,
                onlinescore_updated: onlinescore,

                ...uenc.setIndex(entries),
                numscores: entries.length,

                count,
                total,

                myrank: userRank || count,
                myscore: userScore?.totalScore || 0,
                star_score: userScore?.stars || 0,

                ...themeResults,
                song_id: song_id,

                // Locked songs
                last_song_unlocked: global.config.LOCKED.lastSong,
                next_unlocked_song_id: global.config.LOCKED.nextSong,

                current_star_count: await scores.getStarCount(),
                star_count_for_unlock: global.config.LOCKED.starCountToUnlock,

                happyhour: utils.serverTime(global.config.HAPPYHOUR.time),
                happyhour_duration: global.config.HAPPYHOUR.duration,

                t: utils.serverTime()
            });
        }
        catch (err) {
            return next({
                status: 500,
                message: `Can't get ranking: ${err}`,
                error: err.message
            });

        }
    }
}