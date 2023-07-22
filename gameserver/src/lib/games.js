class Games {
    constructor() {
        this.games = global.gs.GAMES;
    }

    getGames(availability = true) {
        return this.games.filter(g => this.isGameAvailable(g.version));
    }

    /**
     * Find game by your own filter function
     * @param {*} fn 
     * @returns 
     */
    getGame(fn) {
        return this.games.filter(fn)[0] || null;
    }

    /**
     * Get game by gameId
     * @param {*} id 
     * @returns 
     */
    getGameById(id) {
        return this.games.filter(g => g.regions.hasOwnProperty(id))[0] || null;
    }

    /**
     * Get game by version
     * @param {*} version 
     * @returns 
     */
    getGameByVersion(version) {
        return this.games.filter(g => g.version == version)[0] || null;
    }

    /**
     * Checks if game is available
     * If region is provided, it will return if region is available
     * but if gameId is provided it will check if the game is available
     * @param {*} idOrVersion 
     * @returns 
     */
    isGameAvailable(idOrVersion) {
        let game = this.getGameById(idOrVersion) || this.getGameByVersion(idOrVersion);
        if (!game) return false;

        let isRegion = game.regions.hasOwnProperty(idOrVersion);
        if (isRegion && game.isAvailable) return game.regions[idOrVersion]?.isAvailable || false;

        return game.isAvailable;
    }

    /**
     * Returns game's statistics
     * @param {*} idOrVersion 
     * @returns 
     */
    getGameStats(idOrVersion) {
        let game = this.getGameById(idOrVersion) || this.getGameByVersion(idOrVersion);
        if (!game) return null;
        return game.stats;
    }
}

module.exports = new Games();