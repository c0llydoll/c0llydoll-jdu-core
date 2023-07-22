const fs = require("fs-extra");
const minifyXML = require("minify-xml").minify;
const path = require("path");

const lua = require("./lua");
const timeline = require("./timeline");

class Components {
    constructor() {};

    init({ mapName, platformId, cacheFolder, worldFolder, songDescTemplate,
        isLyn, isJD5, isUbiArt }) {
        
        const mapNameLow = mapName.toLowerCase();

        this.writeComponent(`${cacheFolder}/songdesc.tpl.ckd`, this.songDesc(songDescTemplate));

        /** AUDIO */
        const musicTrack = timeline.trkToMusicTrack(mapName);
        this.writeComponent(`${cacheFolder}/audio/${mapNameLow}_musictrack.tpl.ckd`, this.actorTemplate([musicTrack]))
        this.writeComponent(`${cacheFolder}/audio/${mapNameLow}_audio.isc.ckd`, this.audioScene(mapName));
        const ambs = timeline.processAmbs(mapName);
        ambs.forEach(amb => {
            const { fileName, soundList } = amb;
            this.writeComponent(`${cacheFolder}/audio/amb/${fileName}.tpl.ckd`, this.actorTemplate([{
                __class: "SoundComponent_Template",
                soundList
            }]));
        });

        /** CINEMATICS */
        
        const sequences = timeline.processSequences(mapName);
        this.writeComponent(`${cacheFolder}/cinematics/${mapNameLow}_cine.isc.ckd`, this.cinematicScene(mapName));
        this.writeComponent(`${cacheFolder}/cinematics/${mapNameLow}_mainsequence.act.ckd`, this.cinematicActor(mapName));
        this.writeComponent(`${cacheFolder}/cinematics/${mapNameLow}_mainsequence.tpl.ckd`, this.mainSequence(mapName));
        this.writeComponent(`${cacheFolder}/cinematics/${mapNameLow}_mainsequence.tape.ckd`, this.mainSequenceTape(mapName, sequences));

        /** TIMELINE */
        this.writeComponent(`${cacheFolder}/timeline/${mapNameLow}_timeline.isc.ckd`, this.timelineScene(mapName));
        this.writeComponent(`${cacheFolder}/timeline/${mapNameLow}_tml_dance.act.ckd`, this.timelineDanceActor(mapName));
        this.writeComponent(`${cacheFolder}/timeline/${mapNameLow}_tml_karaoke.act.ckd`, this.timelineKaraokeActor(mapName));
        this.writeComponent(`${cacheFolder}/timeline/${mapNameLow}_tml_dance.tpl.ckd`, this.timelineDance(mapName));
        this.writeComponent(`${cacheFolder}/timeline/${mapNameLow}_tml_karaoke.tpl.ckd`, this.timelineKaraoke(mapName));

        // If ubiArt
        if (isUbiArt) {
            const { dtapeClips, ktapeClips } = timeline.processUbiArt(mapName);
            this.writeComponent(`${cacheFolder}/timeline/${mapNameLow}_tml_dance.dtape.ckd`, this.tape(mapName, dtapeClips));
            this.writeComponent(`${cacheFolder}/timeline/${mapNameLow}_tml_karaoke.ktape.ckd`, this.tape(mapName, ktapeClips));
        };

        /** VIDEOSCOACH */
        this.writeComponent(`${cacheFolder}/videoscoach/${mapNameLow}_video.isc.ckd`, this.videoScene(mapName));
        this.writeComponent(`${cacheFolder}/videoscoach/video_player_main.act.ckd`, this.videoPlayerActor(mapName));
        this.writeComponent(`${cacheFolder}/videoscoach/${mapNameLow}.mpd.ckd`, this.mpd(mapName, platformId));

        // Copy all Movespace / Gestures
        const srcMovesPath = `./map/Timeline/Moves/${platformId.toUpperCase()}`;
        const destMovesPath = `${worldFolder}/timeline/moves/${platformId.toLowerCase()}`;
        if (!fs.existsSync(srcMovesPath))
            signale.warn(`${mapName} does not have a moves folder in Timeline/Moves, MotionClips won't work!`);
        else {
            fs.copySync(srcMovesPath, destMovesPath);
            fs.readdirSync(destMovesPath).forEach(file => {
                fs.renameSync(path.resolve(destMovesPath, file), path.resolve(destMovesPath, file.toLowerCase()))
            });
        };
    };

    writeComponent(path, data) {
        const xml = ["isc"];
        const binary = ["act", "mpd"];
        const luas = ["tape", "tpl", "dtape", "ktape"];
        const type = path.split(".")[path.split(".").length-2];

        if (xml.includes(type))
            data = minifyXML(data)
        else if (luas.includes(type))
            data = JSON.stringify(data || {});
        else if (binary.includes(type))
            data = Buffer.from(data, "hex");

        fs.writeFileSync(path, data);
    };

    songDesc(songDescTemplate = {}) {
        songDescTemplate.PhoneImages = lua.reduceArrayToObject(songDescTemplate.PhoneImages);
        songDescTemplate.Tags = lua.reduceArray(songDescTemplate.Tags);
        songDescTemplate.DefaultColors.map(({ KEY, VAL }) => [ KEY, VAL ])
        songDescTemplate.DefaultColors = lua.reduceArrayToObject(songDescTemplate.DefaultColors);
        songDescTemplate.Paths = {
            avatars: null,
            asyncplayers: null
        };
        delete songDescTemplate.VideoPreviewPath;
        delete songDescTemplate.AudioPreviewFadeTime;

        return require("../components/ActorTemplate")([songDescTemplate]);
    };

    actorTemplate(components = []) {
        return require("../components/ActorTemplate")(components);
    };

    tape(mapName, clips = []) {
        return require("../components/Tape")(mapName, clips);
    };

    audioScene(mapName) {
        return require("../components/AudioScene")(mapName);
    };

    cinematicScene(mapName) {
        return require("../components/CinematicScene")(mapName);
    };

    cinematicActor(mapName) {
        return require("../components/CinematicActor")(mapName);
    };

    mainSequence(mapName) {
        return require("../components/ActorTemplate")([{
            __class: "MasterTape_Template",
            TapesRack: [{
                    __class: "TapeGroup",
                    Entries: [{
                            __class: "TapeEntry",
                            Label: "master",
                            Path: `world/maps/${mapName.toLowerCase()}/cinematics/${mapName.toLowerCase()}_mainsequence.tape`
                        }
                    ]
                }
            ]
        }]);
    };

    mainSequenceTape(mapName, clips = []) {
        return require("../components/Tape")(mapName, clips);
    };

    timelineScene(mapName) {
        return require("../components/TimelineScene")(mapName);
    };

    timelineDance(mapName) {
        return require("../components/ActorTemplate")([{
            __class: "MasterTape_Template",
            TapesRack: [{
                    __class: "TapeGroup",
                    Entries: [{
                            __class: "TapeEntry",
                            Label: "tml_dance",
                            Path: `world/maps/${mapName.toLowerCase()}/timeline/${mapName.toLowerCase()}_tml_dance.dtape`
                        }
                    ]
                }
            ]
        }]);
    };

    timelineKaraoke(mapName) {
        return require("../components/ActorTemplate")([{
            __class: "MasterTape_Template",
            TapesRack: [{
                    __class: "TapeGroup",
                    Entries: [{
                            __class: "TapeEntry",
                            Label: "tml_karaoke",
                            Path: `world/maps/${mapName.toLowerCase()}/timeline/${mapName.toLowerCase()}_tml_karaoke.ktape`
                        }
                    ]
                }
            ]
        }]);
    };

    timelineDanceActor(mapName) {
        return require("../components/TimelineDanceActor")(mapName);
    };

    timelineKaraokeActor(mapName) {
        return require("../components/TimelineKaraokeActor")(mapName);
    };

    videoScene(mapName) {
        return require("../components/VideoScene")(mapName);
    };

    videoPlayerActor(mapName) {
        return require("../components/VideoPlayerActor")(mapName);
    };

    mpd(mapName, platform) {
        return require("../components/MPD")(mapName, platform);
    };

};

module.exports = new Components();