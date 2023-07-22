const contentManager = require("../lib/content-manager");
const skusClient = require("../lib/skus-client");

const Songs = require("../lib/songs");

module.exports = (app, public, private, logger) => {
    
    const songs = new Songs();

    public.get("/songs", skusClient, async (req, res, next) => {
        if (req.dbVersion != 1)
            return next({
                status: 400,
                message: `${req.sku.id} cannot access V1 songDB!`
            });
        const songdb = await req.songs.getSongDb();
        return res.send(songdb);
    });

    private.get("/songs/:mapName", skusClient, async (req, res, next) => {
        const mapName = req.params.mapName;
        const songdb = await req.songs.getSongDatabase({});

        if (songdb[mapName]) return res.send(songdb[mapName]);
        else return res.sendStatus(404);
    });

    private.get("/songs/back-office", skusClient, async (req, res, next) => {
        const songdb = await req.songs.getSongDatabase({});
        return res.send(songdb);
    });

    private.post("/songs/packages/:mapName", async (req, res, next) => {
        const data = req.body;
        const mapName = req.params.mapName;
        try {
            data.mapName = mapName;
            await songs.updatePackage(mapName, data);
            return res.sendStatus(200);
        }
        catch(err) {
            return next({
                status: 500,
                message: err.message
            })
        };
    });

};