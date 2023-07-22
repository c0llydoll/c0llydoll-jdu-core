module.exports.sdkConfig = {
    timeoutSec: 20,
    keepAliveTimeoutMin: 10,
    httpSafetySleepTime: 0,
    popEventsTimeoutMsec: 5000,
    lspPort: 1200,
    httpRetry: {
        maxCount: 3,
        initialDelayMsec: 5000,
        incrementFactorMsec: 5000,
        randomDelayMsec: 5000
    },
    websocketRetry: {
        maxCount: 3,
        initialDelayMsec: 5000,
        incrementFactorMsec: 5000,
        randomDelayMsec: 5000
    },
    remoteLogs: {
        ubiservicesLogLevel: "None",
        prodLogLevel: "None"
    },
    connectionPingIntervalSec: 3,
    httpParam: {
        timeoutParam: {
            initialDelayMsec: 20000
        }
    },
    websocketParam: {
        timeoutParam: {
            initialDelayMsec: 20000
        },
        retryParam: {
            initialDelayMsec: 5000,
            incrementFactorMsec: 5000,
            randomDelayMsec: 5000
        },
        maxCount: 3
    }
};
module.exports.featuresSwitches = [{
    "name": "ApplicationUsed",
    "value": true
}, {
    "name": "Connection",
    "value": true
}, {
    "name": "ContentFiltering",
    "value": true
}, {
    "name": "EntitiesProfile",
    "value": true
}, {
    "name": "EntitiesSpace",
    "value": true
}, {
    "name": "Event",
    "value": true
}, {
    "name": "Everything",
    "value": true
}, {
    "name": "ExtendSession",
    "value": true
}, {
    "name": "FixAccountIssues",
    "value": true
}, {
    "name": "FriendsLookup",
    "value": true
}, {
    "name": "FriendsRequest",
    "value": true
}, {
    "name": "Messaging",
    "value": true
}, {
    "name": "News",
    "value": true
}, {
    "name": "Populations",
    "value": true
}, {
    "name": "PrimaryStore",
    "value": true
}, {
    "name": "Profiles",
    "value": true
}, {
    "name": "ProfilesExternal",
    "value": true
}, {
    "name": "SecondaryStore",
    "value": true
}, {
    "name": "SendPopulationsInPlayerStart",
    "value": false
}, {
    "name": "SendPrimaryStoreEvent",
    "value": true
}, {
    "name": "Socialfeed",
    "value": true
}, {
    "name": "UplayFriends",
    "value": true
}, {
    "name": "UplayLaunch",
    "value": true
}, {
    "name": "UplayWin",
    "value": true
}, {
    "name": "UplayWinActions",
    "value": true
}, {
    "name": "UplayWinRewards",
    "value": true
}, {
    "name": "Users",
    "value": true
}, {
    "name": "UsersManagement",
    "value": true
}, {
    "name": "WebSocketClient",
    "value": true
}];
module.exports.custom = {
    featuresSwitches: [],
    resources: []
};
module.exports.punch = {
    detectUrl1: "lb-uat-detect01.ubisoft.com:11000",
    detectUrl2: "lb-uat-detect02.ubisoft.com:11000",
    traversalUrl: "lb-uat-traversal01.ubisoft.com:11005"
};
module.exports.events = {
    queues: [{
        name: "A",
        sendPeriodMilliseconds: 30000
    }, {
        name: "B",
        sendPeriodMilliseconds: 30000
    }, {
        name: "C",
        sendPeriodMilliseconds: 30000
    }],
    tags: [],
    comment: null
};
module.exports.resources = [];
module.exports.legacyUrls = [];
module.exports.sandboxes = [];