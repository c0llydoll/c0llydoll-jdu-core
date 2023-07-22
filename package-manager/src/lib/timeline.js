const fs = require("fs");
const signale = require("signale");

const lua = require("./lua");
const utils = require("./utils");
const texture = require("./texture");

class Timeline {
    constructor() {};

    processUbiArt(mapName) {
        const dtapePath = `./map/Timeline/${mapName}_TML_Dance.dtape`;
        const ktapePath = `./map/Timeline/${mapName}_TML_Karaoke.ktape`;
        if (!fs.existsSync(dtapePath) || !fs.existsSync(ktapePath))
            throw new Error(`Either DTAPE or KTAPE is missing, cannot process timelines!`);

        const dtapeLua = lua.parseLuaFile(dtapePath);
        const ktapeLua = lua.parseLuaFile(ktapePath);

        const dtapeClips = (dtapeLua.Tape?.Clips || []).map((obj, i) => {
            const className = obj.NAME;
            const clip = obj[className];
            // All clips start with these base keys
            let clipBase = {
                __class: className,
                Id: clip.Id,
                TrackId: clip.TrackId,
                IsActive: clip.IsActive,
                StartTime: clip.StartTime,
                Duration: clip.Duration
            };
            // Depending on clip class, add extra clip data
            switch(className) {
                case "MotionClip":
                    // Minify MPS
                    const MotionPlatformSpecifics = clip.MotionPlatformSpecifics.map(entry => {
                        entry.VAL = entry.VAL["MotionPlatformSpecific"];
                        entry.VAL.__class = "MotionPlatformSpecific";
                        return entry;
                    });
                    clipBase = {
                        ...clipBase,
                        ClassifierPath: clip.ClassifierPath.toLowerCase(),
                        GoldMove: clip.GoldMove,
                        CoachId: clip.CoachId,
                        MoveType: clip.MoveType,
                        Color: [1, 0.937255, 0.32549, 0.72549], //[1, utils.randomFloat(), utils.randomFloat(), utils.randomFloat()],
                        MotionPlatformSpecifics: lua.reduceArrayToObject(MotionPlatformSpecifics)
                    };
                    break;
                case "PictogramClip":
                    clipBase = {
                        ...clipBase,
                        PictoPath: clip.PictoPath.toLowerCase(),
                        MontagePath: "",
                        AtlIndex: 4294967295,
                        CoachCount: 4294967295
                    };
                    break;
                case "GoldEffectClip":
                    clipBase = {
                        ...clipBase,
                        EffectType: clip.EffectType
                    };
                    break;
            };
            return clipBase;
        });

        const ktapeClips = (ktapeLua.Tape?.Clips || []).map((obj, i) => {
            const className = obj.NAME;
            const clip = obj[className];
            // All clips start with these base keys
            let clipBase = {
                __class: className,
                Id: clip.Id,
                TrackId: clip.TrackId,
                IsActive: clip.IsActive,
                StartTime: clip.StartTime,
                Duration: clip.Duration
            };
            switch(className) {
                case "KaraokeClip":
                    clipBase = {
                        ...clipBase,
                        Pitch: clip.Pitch || 8.175798,
                        Lyrics: clip.Lyrics,
                        IsEndOfLine: clip.IsEndOfLine || 0,
                        ContentType: clip.ContentType || 1,
                        StartTimeTolerance: 4,
                        EndTimeTolerance: 4,
                        SemitoneTolerance: 5
                    };
            };
            return clipBase;
        });

        return { dtapeClips, ktapeClips };
    };

    trkToMusicTrack(mapName) {
        const trkPath = `./map/Audio/${mapName}.trk`
        if (!fs.existsSync(trkPath))
            throw new Error(`${mapName} does not have a TRK file, cannot proceed!`);
        const trk = lua.parseLuaFile(trkPath)["MusicTrackStructure"];
        const musicTrack = {
            __class: "MusicTrackComponent_Template",
            trackData: {
                __class: "MusicTrackData",
                structure: {
                    __class: "MusicTrackStructure",
                    markers: lua.reduceArray(trk.markers),
                    signatures: trk.signatures.map(s => {
                        return {
                            __class: "MusicSignature",
                            marker: s.MusicSignature.marker,
                            beats: s.MusicSignature.beats
                        };
                    }),
                    sections: trk.sections.map(s => {
                        return {
                            __class: "MusicSection",
                            marker: s.MusicSection.marker,
                            sectionType: s.MusicSection.sectionType,
                            comment: s.MusicSection.comment || ""
                        };
                    }),
                    startBeat: trk.startBeat,
                    endBeat: trk.endBeat,
                    fadeStartBeat: 0,
                    useFadeStartBeat: false,
                    fadeEndBeat: 0,
                    useFadeEndBeat: false,
                    videoStartTime: trk.videoStartTime,
                    previewEntry: trk.previewEntry,
                    previewLoopStart: trk.previewLoopStart,
                    previewLoopEnd: trk.previewLoopEnd,
                    volume: -2,
                    fadeInDuration: 0,
                    fadeInType: 0,
                    fadeOutDuration: 0,
                    fadeOutType: 0
                },
                path: `world/maps/${mapName.toLowerCase()}/audio/${mapName.toLowerCase()}.wav`,
                url: `jmcs://jd-contents/${mapName}/${mapName}.ogg`
            }
        };

        return musicTrack;
    };

    processAmbs(mapName) {
        const ambFolder = `./map/Audio/AMB/`;
        // Load main sequence and keep SoundSetClip only
        const mainSequence = lua
            .parseLuaFile(`./map/Cinematics/${mapName}_MainSequence.tape`)
            .Tape.Clips.filter(c => c.NAME == "SoundSetClip")
            .map(c => c["SoundSetClip"]);
        const ambs = [];

        // If no AMB folder, exit
        if (!fs.existsSync(ambFolder)) return;

        mainSequence.forEach(clip => {
            let tplName = clip.SoundSetPath.split("/").pop().toLowerCase().split(".")[0];
            let fileName = tplName;
            if (tplName.startsWith("set_")) tplName = tplName.substring(4);
            ambs.push({
                fileName,
                soundList: [{
                    __class: "SoundDescriptor_Template",
                    name: tplName,
                    volume: 0,
                    category: "amb",
                    limitCategory: "",
                    limitMode: 0,
                    maxInstances: 4294967295,
                    files: [`world/maps/${mapName.toLowerCase()}/audio/amb/${tplName}.wav`],
                    serialPlayingMode: 0,
                    serialStoppingMode: 0,
                    params: {
                        __class: "SoundParams",
                        loop: 0,
                        playMode: 1,
                        playModeInput: "",
                        randomVolMin: 0,
                        randomVolMax: 0,
                        delay: 0,
                        randomDelay: 0,
                        pitch: 1,
                        randomPitchMin: 1,
                        randomPitchMax: 1,
                        fadeInTime: 0,
                        fadeOutTime: 0,
                        filterFrequency: 0,
                        filterType: 2,
                        transitionSampleOffset: 0
                    },
                    pauseInsensitiveFlags: 0,
                    outDevices: 4294967295,
                    soundPlayAfterdestroy: 0
                }]
            })
        });

        return ambs;
    };

    processSequences(mapName) {
        // Check if the map has a sequence tape for cinematics tape
        // if it does, only get UI hide classes, we dont need ambs
        const sequencePath = `./map/Cinematics/${mapName}_MainSequence.tape`;
        const sequences = [];
        if (fs.existsSync(sequencePath)) {
            // Loop through each LUA tape clips
            const clips = lua.parseLuaFile(sequencePath)?.Tape?.Clips || [];
            clips.forEach((c, id) => {
                const className = c.NAME;
                const obj = c[className];
                let base = {
                    __class: className,
                    Id: obj.Id || i,
                    TrackId: obj.TrackId || i + 55,
                    IsActive: obj.IsActive || 1,
                    StartTime: obj.StartTime,
                    Duration: obj.Duration
                };
                // Add custom data depending on class
                switch(className) {
                    case "HideUserInterfaceClip":
                        base = {
                            ...base,
                            EventType: 18,
                            CustomParam: ""
                        };
                        break;
                    case "SoundSetClip":
                        base = {
                            ...base,
                            SoundSetPath: obj.SoundSetPath.toLowerCase(),
                            SoundChannel: obj.SoundChannel || 0,
                            StartOffset: obj.StartOffset || 0,
                            StopsOnEnd: obj.StopsOnEnd || 0,
                            AccountedForDuration: obj.AccountedForDuration || 0
                        };
                        break;
                };
                sequences.push(base);
            });
        };
        return sequences;
    };
};

module.exports = new Timeline();