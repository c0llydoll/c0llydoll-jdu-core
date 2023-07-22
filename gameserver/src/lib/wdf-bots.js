const { uniqueNamesGenerator, NumberDictionary, animals, colors, names } = require("unique-names-generator");

const Playlist = require("wdf-playlist");
const Session = require("wdf-session");
const Score = require("wdf-score");

const games = require("games");
const utils = require("utils");
const scheduler = require("scheduler");

class Bots {
    constructor(version) {
        this.version = version;
        if (!games.isGameAvailable(this.version))
            throw new Error(`${version} is not available for use!`);
        
        this.session = new Session(this.version);
        this.score = new Score(this.version);
        this.playlist = new Playlist(this.version);
        this.countries = global.gs.COUNTRIES;
        this.avatars = global.gs.AVATARS;
        this.game = games.getGameByVersion(this.version);
    }
    
    async createBots(amount) {
        let bots = [];
        for (let i = 0; i < amount; i++) {
            const name = this.randomName().toUpperCase().replace("-", "");
            const country = this.randomCountry().id;
            const avatar = this.randomAvatar().id;
            const userId = utils.randomNumber(1000000000000, 9999999999999);
            const sessionId = utils.randomNumber(1000000000, 9999999999);
            const onlinescore = utils.randomNumber(global.gs.MIN_WDF_LEVEL, global.gs.MAX_WDF_LEVEL);
            let data = {
                userId: userId.toString(),
                sessionId: sessionId.toString(),
                game: {
                    id: Object.keys(this.game.regions)[0],
                    version: this.version
                },
                profile: {
                    avatar,
                    name,
                    country,
                    rank: onlinescore
                },
                isBot: true
            };
            await this.session.newSession(data);
            await scheduler.botScoreJob(sessionId, async () => {
                await this.updateScore(data);
            });
            bots.push(data);
        }
        return bots;
    }

    async clearBots() {
        const sessionCount = await this.session.db.deleteMany({
            "game.version": this.version,
            isBot: true
        });
        const scoreCount = await this.score.db.deleteMany({
            "game.version": this.version,
            isBot: true
        });
        return { 
            scoreCount: scoreCount.deletedCount, 
            sessionCount: scoreCount.deletedCount
        };
    }

    async updateScore(botData) {
        const { sessionId, userId, game, profile } = botData;
        const { isRecap, isSong, isPreSong, isCommunity, isCoach, cur } = await this.playlist.getStatus();

        // If playlist is in recap or pre song, ping session
        if (isRecap || isPreSong) {
            await this.session.pingSession(sessionId);
            return;
        }
        // If playlist is in song, send random score
        else if (isSong) {
            let data = {
                userId,
                sessionId,
                game,
                profile,
                coachIndex: 0,
                event: "",
                lastMove: false,
                score: 0,
                sendScore: true,
                stars: 0,
                themeIndex: 0,
                totalScore: 0,
                isBot: true
            };
    
            const prevScore = await this.score.getScore(sessionId);
            // If user does not have a score entry, create an entry with score as 0
            if (!prevScore) {
                // Depending on current's theme, set the bot's theme or coach index
                if (isCommunity) {
                    data.themeIndex = utils.randomNumber(0, 1)
                }
                else if (isCoach) {
                    let coachCount = cur.map.numCoach;
                    if (coachCount > 1) coachCount -= 1;
                    data.coachIndex = utils.randomNumber(0, coachCount);
                };
                await this.score.updateScore(sessionId, data);
                return data;
            }
            // If user does have a previous score entry, replace it with data
            else data = prevScore;

            // Generate a random score, add it to totalScore and calculate stars
            const scoreRange = {
                "bad": [0, 0],
                "ok": [1, 120],
                "good": [120, 200],
                "perfect": [200, 400]
            };
            let feedback = "";

            const d = Math.random();
            if (d < 0.5)
                feedback = ("perfect");
            else if (d < 0.7)
                feedback = ("ok");
            else if (d < 0.6)
                feedback = ("bad");
            else
                feedback = ("good");
            
            // Add the score and totalScore
            let score = utils.randomNumber(scoreRange[feedback][0], scoreRange[feedback][1]);
            let totalScore = data.totalScore + score;
            if (totalScore > global.gs.MAX_SCORE) {
                totalScore = global.gs.MAX_SCORE;
            }
            
            data.score = score;
            data.totalScore = totalScore;

            // Update stars
            let stars = data.totalScore / 2000;
            if (stars > this.game.maxStars)
                stars = this.game.maxStars;
            data.stars = parseInt(stars);

            await this.score.updateScore(sessionId, data);
            await this.session.pingSession(sessionId);
            return data;
        }
    }

    randomCountry() {
        return this.countries[Math.floor((Math.random()*this.countries.length))];
    };
    
    randomAvatar() {
        let result = [];
        if (this.game.mod)
        {
            result = this.avatars.filter(a => a.version == this.game.modVersion || this.version);
        }
        else {
            result = this.avatars.filter(a => a.version == this.version);
        }
        if (result.length == 0) return { id: 1 };
        return result[Math.floor((Math.random()*result.length))];
    };
    
    randomName() {  
        const nameLength = utils.randomNumber(global.gs.MIN_BOT_NAME, global.gs.MAX_BOT_NAME);
        const numberDictionary = NumberDictionary.generate({ min: 1, max: 50 });
        let config = {
            dictionaries: [animals, numberDictionary, colors, names],
            separator: '',
            length: 1
        };
        // Shuffle array and dictionary length for better random names.
        config.dictionaries = config.dictionaries.sort((a, b) => 0.3 - Math.random());
        config.length = utils.randomNumber(2, config.dictionaries.length);
        return uniqueNamesGenerator(config).slice(0, nameLength);
    };
};

module.exports = Bots;