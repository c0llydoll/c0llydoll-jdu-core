const harbourTicket = require("./harbour-ticket");
const apps = require("./apps");

// Used if token is not required but should be set in request
module.exports.permit = async (req, res, next) => {
    if (req.payload) return next();

    let ticket = req.headers["authorization"];
    if (!ticket) return next();
    
    try {
        ticket = ticket.substring("Ubi_v1 ".length);
        if (ticket.startsWith("t=")) ticket = ticket.substring(2);

        const payload = harbourTicket.verify(ticket);
        const { aid, sid, uid, pid } = payload;

        const app = apps.getApp(aid);
        if (!app) return next({
            status: 401,
            message: `'${aid} is not available in this server.'`
        });

        req.payload = payload;
        req.userId = uid;
        req.sessionId = sid;
        req.appId = aid;
        req.app = app;
        return next();
    }
    catch(err) {
        return next({
            status: 400,
            message: `Can't validate Harbour ticket!`,
            error: err.message
        });
    };
};

// Used if token is required
module.exports.require = async (req, res, next) => {
    return await this.permit(req, res, (err) => {
        if (err) return next(err);

        if (!req.payload) {
            res.set("WWW-Authenticate", "HarbourTicket");
            return next({
                status: 401,
                message: `Harbour ticket is required!`
            });
        };

        return next();
    });
};