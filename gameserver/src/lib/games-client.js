const games = require("games");

/**
 * Appends client's game with gameId from token
 */
module.exports = async (req, res, next) => {
    let path = req.path;
    
    if (!req.gid)
        return next({
            status: 401,
            message: `GameId required for Games client!`
        });

    let game = await games.getGameById(req.gid);
    if (!game)
        return next({
            status: 401,
            message: `Game does not exist!`
        });

    if (global.service.isWdf) {
        let wdfName = path.split("/")[1];
        if (wdfName !== game.wdfName) {
            global.logger.warn(`${req.uid} tried to access ${wdfName} with ${req.gid}!`);
            return next({
                status: 401,
                message: `${game.version} cannot access ${wdfName} WDF!`
            });
        };
    }

    req.game = game;
    req.game.id = req.gid;
    req.version = req.game.version;
    return next();
}