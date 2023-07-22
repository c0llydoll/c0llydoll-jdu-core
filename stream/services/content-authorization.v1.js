// TODO: Patrons player middleware
//       Update times song has been played

const S3Helper = require("../lib/s3-helper");
const skusClient = require("../lib/skus-client");

module.exports = (app, public, private, logger) => {

    const s3 = new S3Helper();

    public.get("/maps/:mapName", skusClient, async (req, res) => {

        const mapName = req.params.mapName;

        const isAvailable = await req.songs.isSongAvailable(mapName);
        if (!isAvailable) return res.sendStatus(404);

        const songPackage = await req.songs.getPackage(mapName);
        const urls = req.songs.prepareUrls(songPackage.urls, false);
        
        // Sign all URLs
        const entries = Object.entries(urls);
        for (let i = 0; i < entries.length; i++) {
            const entry = entries[i];
            entry[1] = await s3.signUrl(entry[1].substring("https://s3.danceparty.online/stream/".length));
        };

        return res.send({
            __class: "ContentAuthorizationEntry",
            duration: 300,
            changelist: 0,
            urls: Object.fromEntries(entries)
        });
    });

};
