const { Binary } = require("bson");
const mongoose = require("mongoose");
const uuid = require("uuid");

const Schema = new mongoose.Schema(
  {
    mapName: {
      type: String,
      unique: true,
      required: true
    },
    mapLength: {
      type: Number
    },
    assets: {
        type: Object
    },
    audioPreviewData: {
        type: String
    },
    urls: {
        type: Object
    },
    packages: {
        type: Object
    },
    videos: {
        type: Object
    },
    version: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true, versionKey: "version" }
);

// Read following url for more
// https://mongoosejs.com/docs/guide.html#versionKey:~:text=Mongoose%20only%20updates%20the%20version%20key%20when%20you%20use%20save().%20If%20you%20use%20update()%2C%20findOneAndUpdate()%2C%20etc.%20Mongoose%20will%20not%20update%20the%20version%20key.%20As%20a%20workaround%2C%20you%20can%20use%20the%20below%20middleware.
Schema.pre('findOneAndUpdate', function() {
  const update = this.getUpdate();
  if (update.version != null) delete update.version;

  const keys = ['$set', '$setOnInsert'];

  for (const key of keys) {
    if (update[key] != null && update[key].version != null) {
      delete update[key].version;
      if (Object.keys(update[key]).length === 0) delete update[key];
    }
  };

  update.$inc = update.$inc || {};
  update.$inc.version = 1;
});

module.exports = mongoose.model("Song", Schema);