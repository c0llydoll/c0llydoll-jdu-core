module.exports = {

    "search": {
        "__class": "ActionList",
        "actions": [
            {
                "__class": "Action",
                "bannerType": "SEARCH",
                "title": "Search",
                "type": "open-keyboard"
            },
            {
                "__class": "Action",
                "bannerContext": "default",
                "bannerTheme": "DEFAULT",
                "bannerType": "SEARCH",
                "title": "Previous Search",
                "type": "previous-search"
            }
        ],
        "itemType": "search"
    },
    "sweatMap": {
        "__class": "ActionList",
        "actions": [
            {
                "__class": "Action",
                "bannerContext": "CONTEXT_SWEAT",
                "bannerTheme": "DEFAULT",
                "bannerType": "song",
                "title": "Dance",
                "type": "play-song"
            },
            {
                "__class": "Action",
                "bannerContext": "CONTEXT_SWEAT",
                "bannerTheme": "DEFAULT",
                "bannerType": "song_leaderboard",
                "title": "Leaderboard",
                "type": "leaderboard"
            },
            {
                "__class": "Action",
                "bannerContext": "CONTEXT_SWEAT",
                "bannerTheme": "DEFAULT",
                "bannerType": "song_licensing",
                "title": "Credits",
                "type": "credits"
            }
        ],
        "itemType": "map"
    },
    "create-challenge": {
        "__class": "ActionList",
        "actions": [],
        "itemType": "challengeV2"
    },
    "create-playlist": {
        "__class": "ActionList",
        "actions": [
            {
                "__class": "Action",
                "title": "Add Song",
                "type": "add-song"
            }
        ],
        "itemType": "map"
    },
    "searchPreset": {
        "__class": "ActionList",
        "actions": [
            {
                "__class": "Action",
                "bannerType": "SEARCH",
                "title": "Search Preset",
                "type": "search-preset"
            }
        ],
        "itemType": "search"
    },
    "NonStop": {
        "__class": "ActionList",
        "actions": [
            {
                "__class": "Action",
                "bannerType": "SHUFFLE",
                "title": "Dance!",
                "type": "start-rowPlaylist"
            }
        ],
        "itemType": "map"
    },
    "partyMap": {
        "__class": "ActionList",
        "actions": [
            {
                "__class": "Action",
                "bannerContext": "family_rival",
                "bannerTheme": "DEFAULT",
                "bannerType": "song",
                "title": "Dance!",
                "type": "play-song"
            },
            {
                "__class": "Action",
                "bannerContext": "family_rival",
                "bannerTheme": "DEFAULT",
                "bannerType": "song",
                "title": "Add to favorites",
                "type": "set-favorite"
            },
            {
                "__class": "Action",
                "bannerContext": "family_rival",
                "bannerTheme": "DEFAULT",
                "bannerType": "song_leaderboard",
                "title": "Leaderboard",
                "type": "leaderboard"
            },
            {
                "__class": "Action",
                "bannerContext": "family_rival",
                "bannerTheme": "DEFAULT",
                "bannerType": "song_licensing",
                "title": "Credits",
                "type": "credits"
            }
        ],
        "itemType": "map"
    },
    "partyMapCoop": {
        "__class": "ActionList",
        "actions": [
            {
                "__class": "Action",
                "bannerContext": "family_coop",
                "bannerTheme": "DEFAULT",
                "bannerType": "song",
                "title": "Dance!",
                "type": "play-song"
            },
            {
                "__class": "Action",
                "bannerContext": "family_coop",
                "bannerTheme": "DEFAULT",
                "bannerType": "song",
                "title": "Add to favorites",
                "type": "set-favorite"
            },
            {
                "__class": "Action",
                "bannerContext": "family_coop",
                "bannerTheme": "DEFAULT",
                "bannerType": "song_leaderboard",
                "title": "Leaderboard",
                "type": "leaderboard"
            },
            {
                "__class": "Action",
                "bannerContext": "family_coop",
                "bannerTheme": "DEFAULT",
                "bannerType": "song_licensing",
                "title": "Credits",
                "type": "credits"
            }
        ],
        "itemType": "map"
    },
    "newsPage": {
        "__class": "ActionList",
        "actions": [
            {
                "__class": "Action",
                "bannerContext": "family_rival",
                "bannerTheme": "DEFAULT",
                "bannerType": "song_licensing",
                "title": "",
                "type": "credits"
            }
        ],
        "itemType": "map"
    },
    "comingSoon": {
        "__class": "ActionList",
        "actions": [
            {
                "__class": "Action",
                "bannerContext": "family_rival",
                "bannerTheme": "DEFAULT",
                "bannerType": "song",
                "title": "Coming Soon!",
                "type": "credits"
            }
        ],
        "itemType": "map"
    },
    "upsell_rival": {
        "__class": "ActionList",
        "actions": [
            {
                "__class": "Action",
                "bannerContext": "family_rival",
                "bannerTheme": "DEFAULT",
                "bannerType": "song",
                "title": "Подписаться",
                "type": "play-song"
            }
        ],
        "itemType": "map"
    },
    "ftue": {
        "__class": "ActionList",
        "actions": [
            {
                "__class": "Action",
                "bannerContext": "family_rival",
                "bannerTheme": "DEFAULT",
                "bannerType": "song",
                "title": "Dance",
                "type": "play-song"
            }
        ],
        "itemType": "map"
    },
    "teaser_ftue": {
        "__class": "ActionList",
        "actions": [
            {
                "__class": "Action",
                "bannerType": "TEASER",
                "title": "",
                "type": "teaser"
            }
        ],
        "itemType": "map"
    }
};