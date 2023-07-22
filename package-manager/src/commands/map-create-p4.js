const cliProgress = require('cli-progress');

const inquirer = require("inquirer");
const signale = require("signale");
const path = require("node:path");
const fs = require("node:fs");

const lua = require("../lib/lua");
const utils = require("../lib/utils");
const texture = require("../lib/texture");
const timeline = require("../lib/timeline");
const mapUtils = require("../lib/map-utils");
const components = require('../lib/components');
const packages = require('../lib/packages');

module.exports = async () => {
    // const { mapName } = await inquirer.prompt([
    //     { type: "input", name: "mapName", message: "Enter mapName" }
    // ]);
    const mapName = "AllIWant";
    // Detect map's version to see if it's LyN, JD5 or UbiArt formatted.
    const { isLyn, isJD5, isUbiArt } = mapUtils.detectVersion(mapName);
    signale.info(`Creating ${mapName} map package for ${utils.arrayToListString(global.config.platforms.map(a => a.id.toUpperCase()))}...`)
    signale.info(`Is UbiArt? : ${isUbiArt} / is LyN? : ${isLyn} / isJD5? : ${isJD5}`);

    // List of required files to use to create package
    const files = [
        { path: `SongDesc.tpl`, required: true },
        { path: `Audio/${mapName}.trk`, required: true },
        { path: `Autodance/${mapName}.ogg`, required: false },
        { path: `Cinematics/${mapName}_MainSequence.tape`, required: false },
        { path: `Timeline`, required: true, dir: true }
    ];

    files.forEach(obj => {
        const dir = `./map/${obj.path}`;
        if (obj.required && !fs.existsSync(dir)) {
            throw new Error(`${obj.path} is a required file/folder, cannot proceed.`)
        };
        if (!obj.required && !fs.existsSync(dir)) {
            signale.warn(`${obj.path} is not required but it's missing, using placeholder files...`)
        };
    });

    for (let i = 0; i < global.config.platforms.length; i++) {
        const platform = global.config.platforms[i];
        const platformId = platform.id;
        const { cacheFolder, worldFolder } = mapUtils.getSceneFolders(mapName, platformId);

        const songDesc = lua.parseLuaFile(`./map/SongDesc.tpl`).Actor_Template.COMPONENTS[0].JD_SongDescTemplate;

        // Components.init will create all necessary files for the package and prepare timeline
        components.init({ 
            mapName, 
            platformId, 
            cacheFolder, 
            worldFolder, 
            songDescTemplate: songDesc,
            isLyn, isJD5, isUbiArt
        });
        
        // Process pictograms into their right format
        signale.info(`Processing pictos for ${platformId}...`);
        await texture.processPictos(cacheFolder, platform);
        signale.info(`Processed pictograms for ${platformId}!`);

        // Pack map content into sku package and upload to API
        signale.info(`Preparing ${platformId} map package...`);
        await packages.prepareMapContent(mapName, platform);
        signale.info(`Prepared ${platformId} map package and uploaded to API!`);
    };
};