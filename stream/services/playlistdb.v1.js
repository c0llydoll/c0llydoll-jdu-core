const skusClient = require("../lib/skus-client");

module.exports = (app, public, private, logger) => {

    public.get("/playlists", skusClient, async (req, res) => {
        var playlists = await req.songs.getPlaylists();

        res.send({
            "__class": "PlaylistDbResponse",
            "db": playlists
        })
    })
 
};