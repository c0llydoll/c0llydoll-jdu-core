const versions = {};
global.config.GAMES.forEach(g => {
    if (g.mainSeries) return;
    versions[g.version] = g.title;
});

module.exports.skuConstants = () => {
    return {
        ChallengeMatch: {
            CreateChallenge: {
                wait_after_share: 5
            }
        },
        Friends: {
            FriendListService: {
                refresh_interval: 120
            },
            FriendsPresence: {
                max_msg: 6,
                refresh_time: 121
            },
            FriendsUGC: {
                max_msg: 5,
                refresh_time: 120
            }
        },
        Home: {
            Fetch: {
                during_session_tiles_count: 1,
                new_session_tiles_count: 3,
                played_maps_count: 2
            }
        },
        JDVersion: {
            Override: versions
        },
        Quest: {
            minimumScore: {
                value: 1000
            },
            questOverride: {
                value: []
            },
            sessionCountUntilDiscoveryKill: {
                value: 4
            },
            sessionCountUntilFirstDiscoveryKill: {
                value: 2
            },
            sessionCountUntilQuestKill: {
                value: 10
            }
        },
        Subscription_Service: {
            ECTokenFetch: {
                retry_count: 3,
                retry_interval: 598
            },
            ServerRefresh: {
                refresh_interval: 600,
                retry_interval: 60,
                retry_interval_s2s: 600
            }
        },
        Unlockables: {
            AAAMap: {
                LockAAAMap2: 1,
                considerLocking: 1,
                map1: 1,
                map2: "Thumbs"
            }
        },
        WDF: {
            Recap: {
                recap_retry_interval: 2
            },
            UpdateScore: {
                update_failure_allowance: 10,
                update_score_interval: 5
            }
        },
        Wall: {
            FriendsWall: {
                max_msg: 7,
                refresh_time: 122
            }
        }
    }
};