const Songs = require("./songs");
const contentManager = require("./content-manager");
const baseCategories = require("./base-categories");

class Carousel {
    constructor(sku) {
        this.sku = sku;
        this.platform = sku?.platform;
        this.skuId = sku?.id;

        this.songs = new Songs(sku);
    };

    async songCategories(pageType = "party") {
        const songDb = Object.values(await this.songs.getSongDb());

        const baseCats = await baseCategories(songDb);
        const livePlaylists = await contentManager.fetchPlaylists();

        const categories = [];
        const componentClass = this.getComponentFromPageType(pageType);
        const actionType = this.getActionListFromPageType(pageType);

        // Push base categories
        baseCats.forEach(c => {
            const items = c.songs.map(s =>
                this.itemClass(componentClass, actionType, { mapName: s.mapName }, s.createdAt)
            ) || [];

            categories.push(
                this.categoryClass(c.name, items)
            );
        });

        // Insert live playlists after first base category which should be "DanceParty Stream"
        livePlaylists.forEach(c => {
            const items = c.songs.map(s => 
                this.itemClass(componentClass, actionType, { mapName: s.mapName }, s.createdAt)
            ) || [];
            categories.splice(1, 0, this.categoryClass(c.name, items));
        });
        
        return categories;
    };

    actionList() {
        return require("./carousel-action-list");
    };

    songItemList() {
        return require("./carousel-song-item-list");
    };

    categoryClass(name, items = []) {
        return {
            __class: "Category",
            title: name,
            act: "ui_carousel",
            isc: "grp_row",
            items: [...items]
        }
    };

    itemClass(componentClass, actionType, data = {}, itemCreationTime = "") {
        const createdAt = new Date(itemCreationTime);
        const now = new Date();

        const newTagDuration = global.config.CAROUSEL_NEW_TAG_DURATION;
        const isNewSong = ((now.getTime() - createdAt.getTime()) < newTagDuration) ? true : false;

        return {
            __class: "Item",
            isc: "grp_cover",
            act: "ui_component_base",
            components: [{
                __class: componentClass,
                ...data,
                isNewSong
            }],
            actionList: actionType
        };
    };

    getComponentFromPageType(pageType) {
        switch (pageType) {
            case "party":
                return "JD_CarouselContentComponent_Song"
        }
    };

    getActionListFromPageType(pageType) {
        switch (pageType) {
            case "party":
                return "partyMap"
        }
    };
};

module.exports = Carousel;