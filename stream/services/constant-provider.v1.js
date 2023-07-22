const constantProvider = require("../lib/constant-provider")

module.exports = (app, public, private, logger) => {

    public.get("/sku-constants", (req, res) => {
        return res.send(constantProvider.skuConstants());
    });

};