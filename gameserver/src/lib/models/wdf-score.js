const { Binary } = require("bson");
const mongoose = require("mongoose");
const uuid = require("uuid");

const Schema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    sessionId: {
      type: String,
      unique: true,
      required: true
    },
    game: {
      type: Object,
      required: true
    },
    profile: {
      type: Object,
      required: true
    },
    coachIndex: {
      type: Number,
      required: true
    },
    event: {
      type: String,
      required: true
    },
    lastMove: {
      type: Boolean,
      required: true
    },
    score: {
      type: Number,
      required: true
    },
    sendScore: {
      type: Boolean,
      required: true
    },
    stars: {
      type: Number,
      required: true
    },
    themeIndex: {
      type: Number,
      required: true
    },
    totalScore: {
      type: Number,
      required: true
    },
    isBot: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("WDF-Score", Schema);