class Skus {
    constructor() {
        this.skus = global.config.SKUS;
    };

    getSkus() {
        return this.skus;
    };

    getAvailableSkus() {
        return this.skus.filter(s => s.dev == false);
    };

    getSku(skuId) {
        return this.skus.find(s => s.id == skuId);
    };

    isSkuAvailable(skuId) {
        // If skuId does not exist OR skuId exists but is not available
        if (!this.getSku(skuId))
            return false;
        else return true;
    };
};

module.exports = new Skus();