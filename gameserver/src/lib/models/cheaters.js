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
    reason: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Cheaters", Schema);