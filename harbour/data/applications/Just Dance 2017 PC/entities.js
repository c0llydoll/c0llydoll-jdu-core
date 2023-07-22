const uuid = require("uuid");

module.exports = [{
    entityId: uuid.v4(),
    name: "default",
    type: "server",
    tags: [],
    server: {
        name: "PROD",
        url: "http://stream-api.danceparty.online"
    },
    lastModified: new Date().toISOString()
}, {
    entityId: uuid.v4(),
    name: "uat",
    type: "server",
    tags: [],
    server: {
        name: "UAT",
        url: "http://uat-stream-api.danceparty.online"
    },
    lastModified: new Date().toISOString()
}];