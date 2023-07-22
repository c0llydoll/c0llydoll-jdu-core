const { Binary } = require("bson");
const mongoose = require("mongoose");
const uuid = require("uuid");

const Schema = new mongoose.Schema(
  {
    profileId: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    mac: {
      type: String,
      required: true
    },
    userCountry: {
      type: Number,
      required: true
    },
    coachId: {
      type: Number,
      required: true
    },
    gameMode: {
      type: Number,
      required: true
    },
    game: {
      type: Object,
      required: true
    },
    songId: {
      type: String,
      required: true
    },
    score: {
      type: Number,
      required: true
    },
    totalScore: {
      type: Number,
      required: true
    },
    partialScores: {
      type: Buffer,
      required: true
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Score", Schema);