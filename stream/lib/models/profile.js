const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        nickname: {
            type: String
        },
        platformId: {
            type: String,
            unique: true
        },
        profileId: {
            type: String,
            unique: true
        },
        avatar: {
            type: Number,
            required: true
        },
        skin: {
            type: Number
        },
        alias: {
            type: Number
        },
        aliasGender: {
            type: Number
        },
        portraitBorder: {
            type: Number
        },
        jdPoints: {
            type: Number
        },
        country: {
            type: Number,
            required: true
        },
        wdfRank: {
            type: Number,
            required: true
        },
        stars: {
            type: Number,
            required: true
        },
        diamondPoints: {
            type: Number
        },
        unlocks: {
            type: Number,
            required: true
        },
        unlockedAvatars: {
            type: Array
        },
        unlockedSkins: {
            type: Array
        },
        unlockedAliases: {
            type: Array
        },
        unlockedPortraitBorders: {
            type: Array
        },
        songsPlayed: {
            type: Number,
            required: true
        },
        progression: {
            type: Object,
            required: true
        },
        history: {
            type: Object
        },
        scores: {
            type: Object
        },
        stats: {
            type: Object
        },
        language: {
            type: String
        },
        syncVersions: {
            type: Object
        },
        otherPids: {
            type: Array
        },
        mapHistory: {
            type: Object
        },
        favorites: {
            type: Array
        },
        populations: {
            type: Array
        }
    }
);

module.exports = mongoose.model("Profile", Schema);