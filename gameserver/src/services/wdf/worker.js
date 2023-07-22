const Bots = require("wdf-bots");
const Playlist = require("wdf-playlist");

const games = require("games");
const utils = require("utils");
const scheduler = require("scheduler");

/**
 * This is where we start all jobs after service starts.
 * It can be also used for jobs for server restarts.
 */
module.exports = async() => {

    if (!global.args.ns) {
        global.logger.info(`Starting schedule deletion job...`);
        await scheduler.sessionJob();
    }
    const gamesList = games.getGames();

    // Loop through all games
    for (let i = 0; i < gamesList.length; i++) {
        const { name, version } = gamesList[i];

        const playlist = new Playlist(version);
        const wdfBots = new Bots(version);

        // Fetch playlist, it will automatically sync the playlist.
        await playlist.getStatus();

        // Remove all previous bots
        const { sessionCount, scoreCount } = await wdfBots.clearBots();
        if (sessionCount > 0 || scoreCount > 0)
            global.logger.info(`Cleared ${sessionCount} bots and ${scoreCount} bot scores from ${name} after server restart.`);

        if (global.gs.ENABLE_BOTS || (global.gs.ENABLE_BOTS && !global.args.nb)) {
            const randomAmount = utils.randomNumber(global.gs.MIN_BOT_AMOUNT, global.gs.MAX_BOT_AMOUNT);
            const bots = await wdfBots.createBots(randomAmount);
            global.logger.info(`Created ${bots.length} bots for ${name}!`);
        };
    }
};