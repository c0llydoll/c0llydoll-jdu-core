// List of games that are available in Gameserver.

// Example:
// {
//     name: "Just Dance 2014", Full name of the game
//     isAvailable: true, If the game is allowed to access services
//     Region games
//     regions: {
//            Region ID
//            SJOP: {
//                region: PAL,
//                isAvailable: true You can also enable/disable certain regions
//            },
//            SJOE: {
//                region: NTSC,
//                isAvailable: true
//            }
//     },
//     We keep the game's star count, amount of songs and unlocksCount here to detect any cheating
//     stats: { 
//         totalStars: 275, Amount of all that can be earned in game
//         songsCount: 55, Amount of all songs in game
//         unlocksCount: 24 Amount of unlockables (avatars)
//     }
// }

const PAL = "PAL";
const NTSC = "NTSC";

const games = [{
    name: "Just Dance 2014",
    version: 2014,
    ported: false,
    mod: false,
    isAvailable: true,
    regions: {
        SJOP: {
            region: PAL,
            isAvailable: true
        },
        SJOE: {
            region: NTSC,
            isAvailable: true
        }
    },
    stats: {},
    maxStars: 5,
    wdfName: "wdf",
    isJD5: true
}, {
    name: "Just Dance 2015",
    version: 2015,
    ported: false,
    mod: false,
    isAvailable: true,
    regions: {
        SE3P: {
            region: PAL,
            isAvailable: true
        },
        SE3E: {
            region: NTSC,
            isAvailable: true
        }
    },
    stats: {
        totalStars: 465,
        songsCount: 93,
        unlocksCount: 27
    },
    maxStars: 5,
    wdfName: "wdf15",
    isJD15: true
}, {
    name: "Just Dance 2016",
    version: 2016,
    ported: false,
    mod: false,
    isAvailable: true,
    regions: {
        SJNP: {
            region: PAL,
            isAvailable: true
        },
        SJNE: {
            region: NTSC,
            isAvailable: true
        }
    },
    stats: {
        totalStars: 280,
        songsCount: 56,
        unlocksCount: 32
    },
    maxStars: 5,
    wdfName: "wdfjd6"
}, {
    name: "Just Dance 2017",
    version: 2017,
    ported: false,
    mod: false,
    isAvailable: true,
    regions: {
        SZ7P: {
            region: PAL,
            isAvailable: true
        },
        SZ7E: {
            region: NTSC,
            isAvailable: true
        }
    },
    stats: {
        totalStars: 275,
        songsCount: 55,
        unlocksCount: 24
    },
    maxStars: 6,
    wdfName: "wdfjd6"
}, {
    name: "Just Dance 2018",
    version: 2018,
    ported: false,
    mod: false,
    isAvailable: true,
    regions: {
        SE8P: {
            region: PAL,
            isAvailable: true
        },
        SE8E: {
            region: NTSC,
            isAvailable: true
        }
    },
    stats: {
        totalStars: 420,
        songsCount: 60,
        unlocksCount: 12
    },
    maxStars: 7,
    wdfName: "wdfjd6"
}
];

const mods = [{
    name: "Just Dance Japan",
    author: "Yunyl",
    version: 1000,
    modVersion: 2014,
    ported: true,
    mod: true,
    isAvailable: true,
    regions: {
        SJME: {
            region: PAL,
            isAvailable: true
        }
    },
    stats: {},
    maxStars: 5,
    wdfName: "wdf",
    isJD5: true
}, {
    name: "Just Dance Beats",
    author: "SquareJDBR",
    version: 2000,
    modVersion: 2014,
    ported: false,
    mod: true,
    isAvailable: true,
    regions: {
        SQRE: {
            region: NTSC,
            isAvailable: true
        }
    },
    stats: {},
    maxStars: 5,
    wdfName: "wdf",
    isJD5: true,
}];

module.exports = [
    ...games,
    ...mods
];