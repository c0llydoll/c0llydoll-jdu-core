const utils = require("utils");

module.exports = (req, res, next) => {

    const uenc = require("uenc");

    // If isJson is true request will be sent in JSON (for testing purposes)
    const isJson = ((utils.isDev() || req.headers.hasOwnProperty(global.gs.HEADER_DEBUG)) && req.query.hasOwnProperty("json"));
    
    res.uenc = (data = {}, setIndex = false, offset = 0) => {
        if (global.service.id == "jmcs")
            res.set("Content-Type", "application/x-www-form-urlencoded");
        else if (global.service.id == "wdf") {
            res.set("Content-Type", "text/html");
            data = {
                method_id: req.func?.id || 0,
                ...data,
                err: 0,
                stat: 1
            };
        };
        
        if (isJson) {
            res.set("Content-Type", "application/json");
            return res.json(data);
        }

        let serialized = decodeURIComponent(
            uenc.serialize(data, setIndex, offset)
        );
        return res.send(serialized);
    };
    
    return next();
}