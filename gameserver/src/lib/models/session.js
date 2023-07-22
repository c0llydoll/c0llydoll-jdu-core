const { Binary } = require("bson");
const mongoose = require("mongoose");
const uuid = require("uuid");

const Schema = new mongoose.Schema(
  {
    // profileId: {
    //   type: String,
    //   required: true
    // },
    userId: {
      type: String,
      required: true
    },
    sessionId: {
      type: String,
      required: true
    },
    lobbyId: {
      type: String,
      // required: true disabled for 2014
    },
    game: {
      type: Object,
      required: true
    },
    profile: {
      type: Object,
      required: true
    },
    isBot: {
      type: Boolean
    },
    isJD5: {
      type: Boolean
    },
    ip: {
      type: String
    }
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Session", Schema);