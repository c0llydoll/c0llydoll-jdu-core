const path = require("node:path");

class Spaces {
    constructor() {
        this.apps = require("../data/apps");
    };

    getSpaces() {
        return this.apps;
    };
    getSpace(spaceId) {
        return this.apps.find(a => a.spaceId === spaceId);
    };
    isSpaceAvailable(spaceId) {
        const space = this.getSpace(spaceId);
        if (!space) return false;
        return true;
    };

    getAppFolder(spaceId) {
        const space = this.getSpace(spaceId);
        const appFolder = path.resolve(global.root, "data/applications", space.name);
        return appFolder;
    };
    
    getEntities(spaceId) {
        const space = this.getSpace(spaceId);
        const entitiesPath = path.resolve(this.getAppFolder(spaceId), "entities.js");
        const entities = require(entitiesPath);
        return entities.map(e => {
            return {
                entityId: e.entityId,
                spaceId: spaceId,
                type: e.type,
                name: e.name,
                tags: e.tags,
                obj: e[e.type],
                lastModified: e.lastModified,
                revision: 1
            }
        });
    };

    getEvents(spaceId) {
        const space = this.getSpace(spaceId);
        const eventsPath = path.resolve(this.getAppFolder(spaceId), "events.js");
        const events = require(eventsPath);
        return events;
    };

};

module.exports = new Spaces();