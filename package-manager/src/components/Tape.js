module.exports = (mapName, Clips = []) => {
    return { 
        __class: "Tape", 
        Clips: [...Clips], 
        TapeClock: 0, 
        TapeBarCount: 1, 
        FreeResourcesAfterPlay: 0, 
        MapName: mapName, 
        SoundwichEvent: "" 
    };
};