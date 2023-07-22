const Joi = require("joi");
const md5 = require("md5");
const contentManager = require("./content-manager");
const { createLogger } = require("./logger");
const S3Helper = require("./s3-helper");
const skus = require("./skus");
const utils = require("./utils");

const asset = Joi.object({
    /** Banner and map backgrounds */
    banner_bkgImageUrl: Joi.string().required(),
    map_bkgImageUrl: Joi.string().optional(),
    /** Cover assets */
    coverImageUrl: Joi.string().required(),
    cover_1024ImageUrl: Joi.string().optional(),
    cover_smallImageUrl: Joi.string().required(),
    /** Coaches */
    coach1ImageUrl: Joi.string().required(),
    coach2ImageUrl: Joi.string().optional(),
    coach3ImageUrl: Joi.string().optional(),
    coach4ImageUrl: Joi.string().optional(),
    /** Phone coaches */
    phoneCoach1ImageUrl: Joi.string().required(),
    phoneCoach2ImageUrl: Joi.string().optional(),
    phoneCoach3ImageUrl: Joi.string().optional(),
    phoneCoach4ImageUrl: Joi.string().optional(),
    phoneCoverImageUrl: Joi.string().required(),
    /** Expand assets (albumbkg & albumcoach) */
    expandBkgImageUrl: Joi.string().required(),
    expandCoachImageUrl: Joi.string().required()
});

/**
 * Songs is a library for handling all song related content
 * It also helps with building song database and uploading to CDN if needed
 */
class Songs {
    /**
     * @param {Object} sku Skupackage object 
     */
    constructor(sku) {
        this.sku = sku;
        this.platform = sku?.platform;
        this.skuId = sku?.id;

        this.s3 = new S3Helper();
        this.db = require("./models/song");
        this.logger = createLogger({ service: "songs-lib" });

        this.cdnSkus = global.config.CDN_SONGDB_SKUS;
        this.cdnDbPath = `private/songdb/${global.ENV}`;
    };

    /**
     * Builds a songDB from songs in MGMT and combine them with package data from our local DB
     * @returns 
     */
    async buildSongDb() {
        const songDb = {};
        const publicationState = utils.isDev() ? "preview" : "live";

        const songs = await contentManager.fetchSongs(publicationState);
        const songPackages = await this.getPackages();

        // Loop through all songs in mgmt and combine their 
        // data with their packageData if they have any
        for (let i = 0; i < songs.length; i++) {
            const songDesc = songs[i];
            let packageData = songPackages.find(p => p.mapName === songDesc.mapName);
        
            // If map does not have any package data, exclude it
            if (!packageData) continue;
            packageData = packageData.toJSON();

            const mapName = songDesc.mapName;
            const mapSkus = songDesc.skus?.data || [];
            const mapTags = songDesc.tags?.data || [];
            const game = songDesc.game?.data.attributes;

            let assets = {};
            let packages = {};
            let skuIds = [];
            let urls = packageData?.urls || {};

            // If platform has assets assets.skus[platform] set as assets{}
            // else delete assets.skus and set default assets{}
            if (packageData.assets.skus && packageData.assets.skus[this.platform])
                assets = packageData.assets.skus[this.platform];
            else {
                delete packageData.assets.skus;
                assets = packageData.assets;
                this.logger.warn(`${mapName} does not have platform assets!`);
            };

            // Sort "assets" by key
            assets = Object.fromEntries(Object.entries(assets).sort());

            // If map has a skuPackage, set mapContent, if not, exclude map
            if (packageData.packages?.hasOwnProperty(this.platform)) {
                packages = {
                    mapContent: `${mapName}_mapContent`
                }
            } else continue;

            // If map skus array is not empty, it means the sku is only available for one game.
            // If it's empty, it means map should be available for all skus.
            if (mapSkus.length > 0) {
                skuIds = mapSkus.map(s => s.attributes.skuId);

                // If given sku is not in map's skuIds, exclude map
                if (!skuIds.includes(this.sku.id)) continue;
            };

            const parentMap = songDesc.parentMap ? songDesc.parentMap?.data?.attributes : { mapName }; // Set a parent map if exists, if not, leave mapName empty
            const tags = this.buildTags(songDesc, mapTags.map(t => t.attributes.tagId));

            // Set MPD codec depending on platform
            if (packageData.mpd && global.config.VP9_PLATFORMS.includes(this.platform))
                packageData.mpd = packageData.mpd["vp9"];
            else if (packageData.mpd)
                packageData.mpd = packageData.mpd["vp8"];
            else packageData.mpd = "";

            songDb[mapName] = {
                artist: songDesc.artist,
                assets: assets,
                audioPreviewData: packageData.audioPreviewData || JSON.stringify({"__class":"MusicTrackData","structure":{"__class":"MusicTrackStructure","markers":[0,21817,43635,65452,87270,109087,130905,152722,174540,196357,218175,239992,261810,283627,305445,327262,349080,370897,392715,414532,436350,458167,479985,501802,523620,545437,567255,589072,610890,632707,654525,676342,698160,719977,741795,763612,785430,807247,829065,850882,872700,894517,916335,938152,959970,981787,1003605,1025422,1047240,1069057,1090875,1112692,1134510,1156327,1178145,1199962,1221780,1243597,1265415,1287232,1309050,1330867,1352685,1374502,1396320,1418137,1439955],"signatures":[{"__class":"MusicSignature","marker":0,"beats":4}],"startBeat":0,"endBeat":432,"fadeStartBeat":0,"useFadeStartBeat":false,"fadeEndBeat":0,"useFadeEndBeat":false,"videoStartTime":0,"previewEntry":0,"previewLoopStart":0,"previewLoopEnd":66,"volume":-0.700000,"fadeInDuration":0,"fadeInType":0,"fadeOutDuration":0,"fadeOutType":0},"path":"","url":"jmcs://jd-contents/${mapName}/${mapName}_AudioPreview.ogg"}),
                coachCount: songDesc.coachCount,
                createdAt: songDesc.createdAt,
                credits: this.buildCredits(songDesc.credits),
                difficulty: songDesc.difficulty,
                jdmAttributes: [],
                lyricsColor: this.getColorWithAlpha(songDesc.lyricsColor),
                lyricsType: 0,
                mainCoach: -1,
                mapLength: packageData.mapLength || 0,
                mapName: mapName,
                mapPreviewMpd: packageData.mpd,
                mode: 6,
                originalJDVersion: parseInt(game.version),
                packages: packages,
                parentMapName: parentMap?.mapName,
                skuIds: skuIds,
                songColors: {
                    songColor_1A: this.getColorWithAlpha(songDesc.songColor1A),
                    songColor_1B: this.getColorWithAlpha(songDesc.songColor1B),
                    songColor_2A: this.getColorWithAlpha(songDesc.songColor2A),
                    songColor_2B: this.getColorWithAlpha(songDesc.songColor2B)
                },
                status: 3,
                sweatDifficulty: songDesc.sweatDifficulty,
                tags: tags,
                title: songDesc.title,
                urls: this.prepareUrls(urls),
                searchTags: [],
                searchTagsLocIds: [],
                serverChangelist: 0
            };
        };

        return songDb;
    };

    /**
     * Builds a playlists DB based on the playlists in MGMT
     * @returns 
     */
    async buildPlaylistDb() {
        var finalPlaylistDb = {};

        const publicationState = utils.isDev() ? "preview" : "live";

        const playlists = await contentManager.fetchPlaylists(publicationState);

        playlists.forEach(playlistData => {
            var playlistId = playlistData["playlistId"];

            finalPlaylistDb[playlistId] = {
                "__class": "PlaylistDbService::Playlist",
                "filters": true,
                "title": playlistData["name"],
                "description": playlistData["description"],
                "coverURL": playlistData["coverURL"],
                "maps": playlistData["songs"].data.map(m => m.attributes.mapName)
            };
        })

        return finalPlaylistDb;
    }

    /**
     * Builds a quests DB based on the playlists in MGMT
     * @returns 
     */
    async buildQuestDb() {
        var finalQuestDb = [];

        const publicationState = utils.isDev() ? "preview" : "live";

        const quests = await contentManager.fetchQuests(publicationState);

        quests.forEach(questData => {
            var data = {
                "__class": "OnlineQuest",
                "assetUrls": {
                    "coverImageURL": questData["coverImageURL"],
                    "logoImageURL": questData["logoImageURL"],
                    "logoShadedImageURL": questData["logoShadedImageURL"] || questData["logoImageURL"],
                    "phoneImageURL": questData["phoneImageURL"] || questData["coverImageURL"]
                },
                "id": questData["questId"],
                "locked": 0,
                "playlist": questData["songs"].data.map(m => m.attributes.mapName),
                "title": questData["name"]
            };

            finalQuestDb.push(data)
        })

        return finalQuestDb;
    }

    /**
     * Fetches built songDb for client
     * if given game requires songDb to be uploaded to cdn, it returns an URL to songDb in cdn
     * @param {*} uploadDb 
     * @returns 
     */
    async getSongDb(uploadDb = true) {
        const songDb = await this.buildSongDb();

        if (uploadDb && this.cdnSkus.includes(this.sku.game.gameVersion)) {
            const uploadResult = await this.uploadSongDb(songDb);
            return uploadResult;
        };

        return songDb;
    };
    
    /**
     * Uploads given songDB to CDN under skuId.hash.json
     * @param {*} songDb 
     * @returns 
     */
    async uploadSongDb(songDb) {
        if (!songDb) throw new Error(`Please provide a songDb!`);

        const hash = md5(JSON.stringify(songDb));
        const latestHash = await this.getLatestHash();

        const dbPath = `${this.cdnDbPath}/${this.skuId}.${hash}.json`;
        const latestPath = `${this.cdnDbPath}/${this.skuId}.${latestHash}.json`;

        if (hash !== latestHash || !latestHash) {
            await this.s3.putObject(dbPath, JSON.stringify(songDb));
            return { url: await this.s3.signUrl(dbPath) };
        }
        else {
            return { url: await this.s3.signUrl(dbPath) };
        };
    };

    /**
     * Retrieves the latest songDB hash from CDN to see if it's latest or not
     * @returns 
     */
    async getLatestHash() {
        const latest = await this.s3.getLatestObject(this.cdnDbPath);
        if (!latest) return;
        return latest.etag;
    };

    /**
     * Checks if given mapName is available for public
     * @param {*} mapName 
     * @returns 
     */
    async isSongAvailable(mapName) {
        const songDb = await this.getSongDb();
        if (songDb.hasOwnProperty(mapName)) return true;
        else return false;
    }

    /**
     * Returns given mapName's package
     * @param {*} mapName 
     * @returns 
     */
    async getPackage(mapName) {
        var mongoPackage = await this.db.findOne({ mapName });
        return mongoPackage;
    }

    /**
     * Returns all map packages from DB
     * @param {*} filter 
     * @returns 
     */
    async getPackages(filter = {}) {
        return await this.db.find(filter);
    };

    /**
     * Returns all playlists from MGMT
     * @returns 
     */
    async getPlaylists() {
        const playlistdb = await this.buildPlaylistDb();
        return playlistdb;
    }

    /**
     * Returns all quests from MGMT
     * @returns 
     */
    async getQuests() {
        const questdb = await this.buildQuestDb();
        return questdb;
    }

    /**
     * Finalizes given credits
     * @param {*} songCredits 
     * @returns 
     */
    buildCredits(songCredits) {
        const defaultCredits = global.config.DEFAULT_CREDITS;
        if (!songCredits) songCredits = "Empty credits."
        if (songCredits.includes(defaultCredits)) songCredits.replace(defaultCredits, "");
        if (!songCredits.endsWith(".")) songCredits += ".";
        if (songCredits.length > 0) songCredits += " ";
        return songCredits + defaultCredits;
    };

    /**
     * Finalizes given song tags
     * @param {*} songDesc 
     * @param {*} songTags 
     * @returns 
     */
    buildTags(songDesc, songTags) {
        const defaultTags = global.config.DEFAULT_TAGS;
        const tags = [...defaultTags];
        if (songDesc.difficulty == 1) tags.push("Easy");
        else if (songDesc.difficulty == 2) tags.push("Medium");
        else if (songDesc.difficulty == 3) tags.push("Hard");
        else if (songDesc.difficulty == 4) tags.push("Extreme");
        if (songDesc.sweatDifficulty == 1) tags.push("Low");
        else if (songDesc.sweatDifficulty == 2) tags.push("Moderate");
        else if (songDesc.sweatDifficulty == 3) tags.push("Intense");
        if (songDesc.coachCount == 1) tags.push("Solo");
        else if (songDesc.coachCount == 2) tags.push("Duet");
        else if (songDesc.coachCount == 3) tags.push("Trio");
        else if (songDesc.coachCount == 4) tags.push("Quartet");
        return [...tags, ...songTags];
    };

    /**
     * Turns hex colors to songDB format color
     * @param {*} color 
     * @returns 
     */
    getColorWithAlpha(color) {
        if (!color) return "FF0000FF";
        color = color.replace("#", "")
        if (color.length < 8) color += "FF"
        return color.toUpperCase();
    }

    async updatePackage(mapName, newData = {}) {
        try {
            const query = { mapName };
            const exists = await this.db.exists(query);
            
            if (!exists) {
                const newPackage = new this.db(newData);
                return await newPackage.save();
            }
            else {
                let prevData = await this.db.findOne(query);
                prevData = prevData.toJSON();
                
                Object.keys(newData).forEach(async (key) => {
                    let to = {};
                    if (key == "assets" || key == "packages" || key == "urls") {
                        to = {
                            [key]: {
                                ...prevData[key],
                                ...newData[key]
                            }
                        };
                    }
                    else to = { [key]: newData[key] };

                    await this.db.findOneAndUpdate({ mapName }, to);
                });
            };
        }
        catch (err) {
            throw new Error(err);
        }
    };

    prepareUrls(urls, isPublic = true) {
        let result = Object.entries(urls).filter(e => e[1].includes(isPublic ? "/public/" : "/private/"));
        result.sort((a,b) => a[1] - b[1]);
        return Object.fromEntries(result);
    };

};

module.exports = Songs;