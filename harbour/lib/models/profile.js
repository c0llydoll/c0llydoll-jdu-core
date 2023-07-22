const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    profileId: {
      type: String,
      unique: true,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    nameOnPlatform: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    preferredLanguage: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      default: null
    },
    lastName: {
      type: String,
      default: null
    },
    gender: {
      type: String,
      default: "M"
    },
    dateOfBirth: {
      type: String,
      required: true
    },
    dateCreated: {
      type: String,
      required: true
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Profile", Schema);