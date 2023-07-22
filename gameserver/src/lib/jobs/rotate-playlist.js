

module.exports = (agenda) => {
    agenda.define("Playlist rotation", async (job, done) => {
        const { version, rotationTime, isNext } = job.attrs.data;
        const now = Date.now()

        const Playlist = require("wdf-playlist");
        const playlist = new Playlist(version);

        const { prev, next, cur } = await playlist.getScreens();

        global.logger.info({
            msg: `Rotating playlist: ${rotationTime} / isNext: ${isNext}`,
            rotationTime,
            delay: now - rotationTime,
            prevMap: prev?.map.mapName,
            curMap: cur?.map.mapName,
            nextMap: next?.map.mapName
        })
        await playlist.rotateScreens();
        await playlist.recalculateScreens();
        done();
    });
};