const fs = require("fs");
const express = require("express");
const router = express.Router();

const songsDb = require("../../../../lib/models/song");

function getSubTitle(map) {

    const mapName = map.mapName;
    const difficulty = map.difficulty;
    const isAlt = mapName.endsWith("ALT");
    const isSweat = mapName.endsWith("SWT");
    const isOnStage = mapName.endsWith("OSC");
  
    if (isAlt && difficulty == 4) return "EXTREME";
    else if (isAlt) return "ALTERNATE";
    else if (isSweat) return "SWEAT";
    else if (isOnStage) return "ON-STAGE";
    
    return "";
};

router.get("/all", async(req, res, next) => {
    const songs = await songsDb.find({});
    return res.send({ 
        songs: songs.map(s => ({...s.toJSON(), subTitle: getSubTitle(s)}))
    });
});

router.get("/:idOrMapName", async(req, res, next) => {
    const idOrMapName = req.params.idOrMapName;
    const song = await songsDb.findOne({
        $or: [{ songId: idOrMapName }, { mapName: idOrMapName}]
    });

    if (!idOrMapName || !song) return next({
        status: 404,
        message: `Can't find song!`
    });

    return res.send(song);
});

module.exports = router;