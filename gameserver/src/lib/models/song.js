const { Binary } = require("bson");
const mongoose = require("mongoose");
const uuid = require("uuid");

const Schema = new mongoose.Schema(
  {
    mapName: {
        type: String,
        required: true
    },
    songId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    version: {
        type: Number,
        required: true
    },
    numCoach: {
        type: Number,
        required: true
    },
    difficulty: {
        type: Number,
        required: true
    },
    songHash: {
        type: String,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    isAvailable: {
        type: Boolean,
        required: true
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Song", Schema);