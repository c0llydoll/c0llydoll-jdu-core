const songs = require("songs");

/**
 * Appends client's game with gameId from token
 */
module.exports = async (req, res, next) => {

    let songId = req.body.uniqueSongId || req.body.songId;

    if (!songId)
        return next({
            status: 400,
            message: `Song ID is required for songs client!`
        });

    let song = await songs.get({ songId });
    if (!song)
        return next({
            status: 400,
            message: `${songId} is not an existing song!`
        });

    if (req.game && req.game.version) {
        if (song.version !== req.game.version)
            return next({
                status: 400,
                message: `Song ${songId} version does not match token version!`
            });
    }

    req.song = song;
    return next();
}