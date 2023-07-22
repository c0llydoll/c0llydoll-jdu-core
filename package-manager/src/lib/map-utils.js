const lua = require('lua-json');
const fs = require("fs");
const path = require("path");

const utils = require("./utils");

class MapUtils {
    constructor() {};

    getSceneFolders(mapName, platformId) {
        const tmpFolder = path.resolve(utils.tmpFolder(), "map", mapName, platformId);
        const cacheFolder = path.resolve(tmpFolder, `cache/itf_cooked/${platformId}/world/maps/${mapName.toLowerCase()}`);
        const worldFolder = path.resolve(tmpFolder, `world/maps/${mapName.toLowerCase()}`);
        const cacheFolders = ["audio", "cinematics", "timeline/pictos", "videoscoach"];
        const worldFolders = [`timeline/moves/${platformId.toLowerCase()}`];
        if (fs.existsSync(`./map/Audio/AMB`)) cacheFolders.push("audio/amb");
        cacheFolders.forEach(f => fs.mkdirSync(path.resolve(cacheFolder, f), { recursive: true }));
        worldFolders.forEach(f => fs.mkdirSync(path.resolve(worldFolder, f), { recursive: true }));
        return { cacheFolder, worldFolder, tmpFolder, cacheFolders, worldFolders };
    };

    detectVersion(mapName) {
        const songDescPath = `./map/SongDesc.tpl`;
        if (!fs.existsSync(songDescPath))
            throw new Error(`${mapName} does not have a SongDesc file! Can't detect version...`);

        const isLyn = (!fs.existsSync(`./map/Timeline/${mapName}_TML_Dance.dtape`) || fs.existsSync(`./map/Timeline/${mapName}.tml`));
        const isJD5 = (!fs.existsSync(`./map/Timeline/${mapName}_TML_Dance.dtape`) || fs.existsSync(`./map/Timeline/timeline.tml`));

        if (isLyn) throw new Error(`${mapName} is a LyN map and does not have UbiArt timelines. Cannot proceed, will be implemented`);

        return {
            isLyn, isJD5, isUbiArt: (!isLyn && !isJD5)
        };
    };

    prepareTimelines() {};
};

module.exports = new MapUtils();