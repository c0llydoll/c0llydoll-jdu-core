const mongoose = require("mongoose");
const uuid = require("uuid");

const Schema = new mongoose.Schema(
  {
    profileId: {
      type: String,
      unique: true,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    mac: {
      type: String,
      unique: true,
      required: true
    },
    avatar: {
      type: Number,
      required: true
    },
    country: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      trim: true,
      required: true
    },
    songsPlayed: {
      type: Number,
      required: true
    },
    stars: {
      type: Number,
      required: true
    },
    unlocks: {
      type: Number,
      required: true
    },
    wdfRank: {
      type: Number,
      required: true
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("DancerCard", Schema);