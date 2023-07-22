const processAssets = require("../lib/process-assets");

module.exports = async (event, data) => {
    
    // Update all assets and upsert them to CDN
    const { mapName } = data;

    await processAssets(data);
};