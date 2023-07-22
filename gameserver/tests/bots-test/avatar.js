const db = require("./avatardb.json")
const fs = require("fs")

let result = [];
let versions = [100, 5, 2014, 2015, 2016, 2017, 2018];

Object.keys(db.avatars).forEach(id => {
    let avtr = db.avatars[id];
    let mapName = avtr.relativeSongName || avtr.UsedAsCoach_MapName;
    let jdVersion = avtr.jdVersion || avtr.JDNowVersion;
    if (!mapName || !jdVersion || mapName.length == 0 || avtr.relativeWDFBossName.length > 0) return;
    if (mapName.endsWith("DLC") || mapName.endsWith("CMU") || mapName.endsWith("FAN")) return;
    if (!versions.includes(jdVersion)) return;
    if (avtr.status !== 1 || avtr.unlockType !== 3) return;
    if (jdVersion == 5) jdVersion = 2014;
    result.push({
        id: Number(id),
        version: jdVersion,
        mapName: mapName,
        coachId: avtr.UsedAsCoach_CoachId || 0,
        price: avtr.mojoPrice || 0,
        status: avtr.status || 1,
        unlockType: avtr.unlockType || 3
    });
});

result.sort((a, b) => a.version.toString().localeCompare(b.version.toString()));

fs.writeFileSync("./src/config/avatars.json", JSON.stringify(result,null,2))