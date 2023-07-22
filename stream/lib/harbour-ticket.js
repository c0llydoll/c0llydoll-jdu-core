var { HEADER_AUTHORIZATION } = global.config.UBISERVICES_TICKET_OPTIONS;

module.exports = (req, res, next) => {
    var ticket = req.header["Authorization"];
    // TODO: define req.ticket

    if (!req.ticket) { 
        res.set("WWW-Authenticate", HEADER_AUTHORIZATION);
        return res.sendStatus(401);
    }

    return next();
}