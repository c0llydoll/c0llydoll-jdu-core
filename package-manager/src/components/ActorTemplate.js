module.exports = (COMPONENTS = []) => {
    return {
        __class: "Actor_Template",
        WIP: 0,
        LOWUPDATE: 0,
        UPDATE_LAYER: 0,
        PROCEDURAL: 0,
        STARTPAUSED: 0,
        FORCEISENVIRONMENT: 0,
        COMPONENTS: [...COMPONENTS]
    };
};