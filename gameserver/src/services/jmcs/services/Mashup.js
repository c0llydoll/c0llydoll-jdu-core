const nas = require("nas-token-client");

module.exports = {

    name: `Mashup`,
    description: `Provides all Mash-Up data such as online maps and metadata.`,
    version: `1.0.0`,

    async init(app, router) {

        let testMaps = [{
            mapName: "BlackWidowSR",
            sku: {
                md5: "e58b265c2618dbb47ef46a5a1acf28bb",
                version: "1408040471",
                url: "http://localhost:3000/BlackWidowSR_1408040471.504991.zip",
                zipStatus: 1,
                zipVersion: 1,
                coverflow: 1
            }
        }];

        router.post("/getCurrentMap", nas.require, (req, res) => {
            let map = testMaps[0];
            return res.uenc({
                mapName: map.mapName,
                version: map.sku.version,
                url: map.sku.url
            });
        });

        router.post("/getMetadata", nas.require, (req, res) => {
            let map = testMaps[0];

            let metadatas = [];
            metadatas.push({
                name: map.mapName,
                id: 0,
                version: map.sku.version,
                md5: map.sku.md5,
                zipStatus: 1,
                zipVersion: 1,
                coverflow: 1,
                url: map.sku.url
            });

            return res.uenc(metadatas, true);
        });
    }
    
}