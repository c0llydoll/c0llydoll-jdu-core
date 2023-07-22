const skusClient = require("../lib/skus-client");

module.exports = (app, public, private, logger) => {

    public.get("/sku-packages", skusClient, async (req, res, next) => {
        const packages = await req.songs.getPackages();
        const skuPackages = {};
        
        for (let i = 0; i < packages.length; i++) {
            const { mapName, packages: package, version } = packages[i];
            if (package.hasOwnProperty(req.platform)) {
                const sku = package[req.platform];
                if (!sku || !sku.md5 || !sku.url) continue;
                skuPackages[`${mapName}_mapContent`] = {
                    md5: sku.md5,
                    storageType: 0,
                    url: sku.url,
                    version: version || 0
                };
            };
        };
        return res.send(skuPackages);
    });

};