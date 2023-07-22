
module.exports.migrateSongs = (cb) => {
    const model = require("../lib/models/song");

    const songdb = require("./songdb.json");
    const songdb2014 = require("./songdb-2014.json");
    const songdbJDJ = require("./songdb-jdjapan.json");

    model.insertMany([
        ...songdb,
        ...songdb2014,
        ...songdbJDJ
    ], (err, ok) => {
        if (err) {
            let msg = err.message || "";
            if (msg.startsWith("E11000 duplicate key error collection"))
                return cb();
            else 
                return cb(err);
        }
        return cb(null, true);
    });
};