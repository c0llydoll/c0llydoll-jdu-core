const axios = require("axios");
const path = require("path");
const fs = require("fs");

class ContentMgmt {
    constructor() {
        this.config = global.secrets.contentMgmt;
        this.headers = {
            authorization: `Bearer ${this.config.token}`
        };
        this.endpoint = (this.config.useSSL ? "https://" : "http://") + this.config.endPoint;
    }

    /**
     * First initilzation of fetching MGMT data, this can be called at server start
     * or can be called from any API route to refresh data live
     */
    async init() {
        try {
            global.config.SKUS = await this.fetchSkus();
            global.config.GAMES = await this.fetchGames();
        }
        catch(err) {
            throw new Error(`Couldn't initate data from Content MGMT: ${err}`);
        };
    };

    /**
     * Requests to MGMT
     * @param {*} schema Schema name to fetch 
     * @param {*} publicationState "preview" will fetch all documents, "live" will only fetch published documents
     * @param {*} sortBy Key to sort documents by
     * @returns 
     */
    async fetchData(schema, publicationState = "preview", sortBy = []) {
        let route = `/api/${schema}?populate=*&publicationState=${publicationState}`;
        sortBy.forEach((s, i) => {
            route += "&sort[" + i + "]=" + s 
        });
        try {
            const { data } = await axios({
                method: "GET",
                url: this.endpoint + route,
                headers: this.headers
            });
            // Shorten array by indexing each object to "attributes"
            if (Array.isArray(data.data))
                return data.data.map(d => d.attributes);
            else
                return data.data.attributes;
        }
        catch(err) {
            throw new Error(`Can't fetch ${schema} data from MGMT: ${err}`);
        }
    };

    /**
     * Fetch all skus from MGMT
     * @returns {Array} 
     */
    async fetchSkus() {
        try {
            const skusData = await this.fetchData("skus");
            // Get rid of "attributes" objects
            const skus = skusData.map(s => {
                // Create a skuId if there isn't any predefined skuId
                s.id = s.skuId || (s.gameVersion + "-" + s.platform +  "-" + s.region);
                s.game = s.game?.data?.attributes || {};
                return s;
            });
            this.saveData("skus", skus);
            return skus;
        }   
        catch(err) {
            console.error(err)
            throw new Error(`Can't fetch skus from MGMT: ${err}`);
        };
    };

    /**
     * Fetches all songs from MGMT
     * @param {*} publicationState "live" for PROD, "preview" for DEV envs
     * @returns 
     */
    async fetchSongs(publicationState = "preview") {
        try {
            const songs = await this.fetchData("songs", publicationState, ["title"]);
            return songs;
        }   
        catch(err) {
            throw new Error(`Can't fetch songs from MGMT: ${err}`);
        };
    };

    /**
     * Fetches all games from MGMT
     * @param {*} publicationState "live" for PROD, "preview" for DEV envs
     * @returns 
     */
    async fetchGames(publicationState = "preview") {
        try {
            const games = await this.fetchData("games", publicationState, ["title"]);
            this.saveData("games", games);
            return games;
        }   
        catch(err) {
            throw new Error(`Can't fetch games from MGMT: ${err}`);
        };
    };

    /**
     * Fetches avatars from MGMT
     * @param {*} publicationState "live" for PROD, "preview" for DEV envs
     * @returns 
     */
    async fetchAvatars(publicationState = "preview") {
        try {
            const avatars = await this.fetchData("avatars", publicationState, ["id"]);
            return avatars;
        }   
        catch(err) {
            throw new Error(`Can't fetch avatars from MGMT: ${err}`);
        };
    };

    /**
     * Fetches skins from MGMT
     * @param {*} publicationState "live" for PROD, "preview" for DEV envs
     * @returns 
     */
    async fetchSkins(publicationState = "preview") {
        try {
            const skins = await this.fetchData("skins", publicationState, ["id"]);
            return skins;
        }   
        catch(err) {
            throw new Error(`Can't fetch skins from MGMT: ${err}`);
        };
    };

    /**
     * Fetches bosses from MGMT
     * @param {*} publicationState "live" for PROD, "preview" for DEV envs
     * @returns 
     */
    async fetchBosses(publicationState = "preview") {
        try {
            const bosses = await this.fetchData("bosses", publicationState, ["bossId"]);
            return bosses;
        }   
        catch(err) {
            throw new Error(`Can't fetch bosses from MGMT: ${err}`);
        };
    };

    /**
     * Fetches playlists from MGMT
     * @param {*} publicationState "live" for PROD, "preview" for DEV envs
     * @returns 
     */
    async fetchPlaylists(publicationState = "preview") {
        try {
            const playlists = await this.fetchData("playlists", publicationState, ["playlistId"]);
            
            return playlists;
        }   
        catch(err) {
            throw new Error(`Can't fetch playlists from MGMT: ${err}`);
        };
    };

    /**
     * Fetches quests from MGMT
     * @param {*} publicationState "live" for PROD, "preview" for DEV envs
     * @returns 
     */
    async fetchQuests(publicationState = "preview") {
        try {
            const quests = await this.fetchData("quests", publicationState, ["questId"]);
            return quests;
        }   
        catch(err) {
            throw new Error(`Can't fetch quests from MGMT: ${err}`);
        };
    };

    /**
     * Fetches playlists from MGMT
     * @param {*} publicationState "live" for PROD, "preview" for DEV envs
     * @returns 
     */
    async fetchPlaylists(publicationState = "preview") {
        try {
            const quests = await this.fetchData("playlists", publicationState, ["name"]);
            return quests.map(p => {
                p.songs = p.songs.data.map(a => a.attributes);
                return p;
            });
        }   
        catch(err) {
            throw new Error(`Can't fetch quests from MGMT: ${err}`);
        };
    };

    async fetchCarouselOrder() {
        try {
            const carouselOrder = await this.fetchData("carousel-order");
            return carouselOrder.games.data.map(g => g.attributes);
        }   
        catch(err) {
            throw new Error(`Can't fetch quests from MGMT: ${err}`);
        };
    };
    
    /**
     * Saves given schema data to ./config/data/name.json
     * It's not really necessary, just making sure we got data
     * @param {*} type Schema name 
     * @param {*} data Data to save (JSON)
     */
    async saveData(type, data) {
        const filename = `${type}.json`;
        const configPath = path.resolve(__dirname, "../config/data", filename);
        fs.writeFileSync(configPath, JSON.stringify(data, null, 2));
    };
};

module.exports = new ContentMgmt();