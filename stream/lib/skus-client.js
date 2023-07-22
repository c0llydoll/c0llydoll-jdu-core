const skus = require("./skus");

const Songs = require("./songs");
const Carousel = require("./carousel");

module.exports = (req, res, next) => {
    if (!req.headers.hasOwnProperty(global.config.HEADER_SKUID)) {
        return next({
            status: 400,
            message: "Sku Id is required for this route."
        })
    };
    
    const skuId = req.headers[global.config.HEADER_SKUID];
    if (!skus.isSkuAvailable(skuId))
        return next({
            status: 400,
            message: `${skuId} doesn't exist or it's not available for use.`
        });
    
    req.sku = skus.getSku(skuId);
    req.sku.id = skuId;
    req.skuId = req.sku.skuId;
    req.wdfRoom = req.sku.wdfRoom;
    req.platform = req.sku.platform;
    req.version = req.sku.version;
    req.gameVersion = req.sku.gameVersion;
    req.dbVersion = global.config.CDN_SONGDB_SKUS.includes(req.gameVersion) ? 2 : 1;
    req.isHD = global.config.HD_PLATFORMS.includes(req.platform) || false;

    req.songs = new Songs(req.sku);
    req.carousel = new Carousel(req.sku);
    return next();
};