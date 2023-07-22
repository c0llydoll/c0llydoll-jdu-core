/**
 * Session and Lobby client
 */

const Session = require("wdf-session");
const cheatDetection = require("cheat-detection");

/**
 * Appends client's lobby to body as req.lobby
 * Used for JD6
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
module.exports.lobby = async (req, res, next) => {
    const userSession = req.session;
    if (!userSession) return next({
        status: 401,
        message: `Session client is required for lobby client!`
    });

    const session = new Session(req.game.version);
    const lobbyId = userSession.lobbyId;
    const lobbyData = await session.getLobby(lobbyId);

    req.lobby = lobbyData;
    return next();
};

/**
 * Appends client's session to body as req.session and req.profile
 * Used for JD6
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
module.exports.session = async (req, res, next) => {
    const sid = req.sid;
    const game = req.game;
    
    if (!sid) return next({
        status: 401,
        message: `SessionId is required for session client!`
    });
    if (!game) return next({
        status: 401,
        message: `Game client is required for session client!`
    });

    const session = new Session(req.game.version);

    const userSession = await session.getSession(sid);
    if (!userSession) return next({
        status: 401,
        message: `Player does not have a session!`
    });

    // Ping session to avoid it from getting removed
    await session.pingSession(sid);

    req.session = userSession;
    req.profile = userSession.profile;
    return next();
};

/**
 * Handles JD5 sessions by the sid in body
 * confirms client can access session by their IP address & pings session
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
module.exports.sessionJd5 = async (req, res, next) => {
    const sid = req.body.sid;
    const version = req.game.version || req.version;
    const ip = req.ip;
    
    if (!sid) return next({
        status: 401,
        message: `SessionId is required for session client!`
    });
    if (!version) return next({
        status: 401,
        message: `No version provided!`
    });

    const session = new Session(version, ip);

    const userSession = await session.getSession(sid);
    if (!userSession) return next({
        status: 401,
        message: `Player does not have a session!`
    });

    // Ping session to avoid it from getting removed
    await session.pingSession(sid);

    req.session = userSession;
    req.profile = userSession.profile;
    return next();
};

/**
 * Parses JD5 Authorization header that provides
 * tracking username and pass which we use to detect actual version.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
module.exports.sessionJd5Auth = async (req, res, next) => {
    const authorization = req.headers.authorization;
    const auths = global.secrets.TRACKING_AUTH;
    
    if (!authorization) return next({
        status: 401,
        message: `Authorization is required!`
    });

    const b64auth = (req.headers.authorization).split(' ')[1] || null;
    if (!b64auth) return next({
        status: 401,
        message: `Authorization is required!`
    });
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

    if (auths.hasOwnProperty(login) && auths[login].pass === password) {
        req.version = auths[login].version;
        req.authVersion = req.version;
        return next();
    }
    else {
        return next({
            status: 401,
            message: `Authorization is required!`
        });
    }
};

/**
 * Handles JD15 sessions by the sid in body
 * confirms client can access session by their IP address & pings session
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
module.exports.sessionJd15 = async (req, res, next) => {
    const sid = req.body.sid || req.body.player_sid;
    const ip = req.ip;
    
    if (!sid) return next({
        status: 401,
        message: `SessionId is required for session client!`
    });

    const session = new Session(2015);

    const userSession = await session.getSession(sid);
    if (!userSession) return next({
        status: 401,
        message: `Player does not have a session!`
    });

    if (userSession.ip !== ip) return next({
        status: 401,
        message: `Player submitted unmatched session!`
    });

    // Ping session to avoid it from getting removed
    await session.pingSession(sid);

    req.session = userSession;
    req.profile = userSession.profile;
    return next();
};

/**
 * Appends sid's cache to request, returns 401 if cache does not exist
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
module.exports.sessionCache = async (req, res, next) => {
    const sid = req.body.sid || req.body.player_sid;
    const version = req.version || 2015;
    
    if (!sid) return next({
        status: 401,
        message: `SessionId is required for session client!`
    });

    const session = new Session(version, req.ip);

    const userCache = await session.getSessionCache(sid);
    if (!userCache) return next({
        status: 401,
        message: `Player does not have a session!`
    });

    if (userCache.game.version !== version) {
        return next({
            status: 401,
            message: `Player's user cache version does not match auth version! ${userCache.game.version} & ${userCache.game.id} != ${version}`
        });
    }

    req.sid = sid;
    req.cache = userCache;
    req.uid = userCache.userId;
    req.game = userCache.game;
    req.game.id = userCache.game.id;
    req.game.version = userCache.game.version;
    return next();
};
