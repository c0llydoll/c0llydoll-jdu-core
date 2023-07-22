const locs = require("../lib/locs");
const skusClient = require("../lib/skus-client");

module.exports = (app, public, private, logger) => {
    
    public.get("/songs", skusClient, async (req, res, next) => {
        if (req.dbVersion != 2)
            return next({
                status: 400,
                message: `${req.sku.id} cannot access V2 songDB!`
            });
        const { url: songDbUrl } = await req.songs.getSongDb();
        const { url: locUrl } = await locs.getLocsUrl();
        return res.send({
            requestSpecificMaps: [],
            localTracks: [],
            songdbUrl: songDbUrl,
            localisationUrl: locUrl
        });
    });

    // public.get("/songs", skusClient, async (req, res, next) => {
    //     if (req.dbVersion != 2)
    //         return next({
    //             status: 400,
    //             message: `${req.sku.id} cannot access V2 songDB!`
    //         });
        
    //     const { url: dbUrl } = await req.songs.getSongDatabase({ available: true });
    //     const { url: locUrl } = await locs.getLocsUrl();
        
    //     return res.send({
    //         requestSpecificMaps: {},
    //         localTracks: [],
    //         songdbUrl: dbUrl,
    //         localisationUrl: locUrl
    //     });
    // });

};