const fs = require("fs");
const path = require("path");
const express = require("express");

const nasClient = require("nas-token-client");
const gameClient = require("games-client");
const dancercardClient = require("dancercard-client");
const songClient = require("songs-client");
const sessionClient = require("wdf-session-client");

const conf = {
    "wdf-jd5": {
        sendVote: {
            id: 840,
            mid: [sessionClient.sessionJd5Auth, sessionClient.sessionCache]
        },
        getMyRank: {
            id: 914,
            mid: [sessionClient.sessionJd5Auth, sessionClient.sessionCache]
        },
        sendScore: {
            id: 934,
            mid: [sessionClient.sessionJd5Auth, sessionClient.sessionCache]
        },
        checkToken: {
            id: 1023,
            mid: [sessionClient.sessionJd5Auth, nasClient.require, gameClient]
        },
        connectToWDF: {
            id: 1166,
            mid: [sessionClient.sessionJd5Auth, nasClient.require, gameClient]
        },
        getServerTime: {
            id: 1350,
            mid: [sessionClient.sessionJd5Auth]
        },
        getBloomBergs2: {
            id: 1374,
            mid: [sessionClient.sessionJd5Auth]
        },
        getPlayListPos: {
            id: 1444,
            mid: [sessionClient.sessionJd5Auth]
        },
        disconnectFromWDF: {
            id: 1695,
            mid: [sessionClient.sessionJd5Auth, nasClient.require, gameClient, sessionClient.sessionCache]
        },
        getCommunityStats: {
            id: 1812,
            mid: [sessionClient.sessionJd5Auth]
        }
    },
    "wdf-legacy": {
        getServerTime: {
            id: 1350
        },
        checkToken: {
            id: 1023,
            mid: [nasClient.require, gameClient]
        },
        sendVote: {
            id: 840,
            mid: [nasClient.require, gameClient]
        },
        getPlayListPos: {
            id: 1444,
            mid: [nasClient.require, gameClient]
        },
        connectToWDF: {
            id: 1166,
            mid: [nasClient.require, gameClient]
        },
        getRandomPlayersWMap: {
            id: 2038,
            mid: [nasClient.require, gameClient]
        },
        getBloomBergs2: {
            id: 1374,
            mid: []
        },
        getPlayerScores: {
            id: 1564,
            mid: [nasClient.require, gameClient] // no session or lobby client, it gets them itself
        },
        disconnectFromWDF: {
            id: 1695,
            mid: [nasClient.require, gameClient]
        },
        getMyRank: {
            id: 914,
            mid: [nasClient.require, gameClient] // no session or lobby client, it gets them itself
        },
        getRandomPlayers: {
            id: 1665,
            mid: [nasClient.require, gameClient]
        }
    },
    "wdf-jd15": {
        sendVote: {
            id: 840,
            mid: [nasClient.require, gameClient, sessionClient.sessionCache]
        },
        getMyRank: {
            id: 914,
            mid: [sessionClient.sessionCache] // no session or lobby client, it gets them itself
        },
        checkToken: {
            id: 1023,
            mid: [nasClient.require, gameClient]
        },
        connectToWDF: {
            id: 1166,
            mid: [nasClient.require, gameClient]
        },
        getServerTime: {
            id: 1350
        },
        getBloomBergs2: {
            id: 1374,
            mid: [nasClient.require, gameClient, sessionClient.sessionCache]
        },
        getPlayListPos: {
            id: 1444,
            mid: []
        },
        getPlayerScores: {
            id: 1564,
            mid: [sessionClient.sessionCache]
        },
        getRandomPlayers: {
            id: 1665,
            mid: [sessionClient.sessionCache]
        },
        disconnectFromWDF: {
            id: 1695,
            mid: [sessionClient.sessionCache]
        },
        getRandomPlayersWMap: {
            id: 2038,
            mid: [sessionClient.sessionCache]
        }
    }
};

/**
 * This helps loading WDF functions with middlewares!
 * All you have to do is just use this lib as a middleware under wdf route
 * @param {*} wdfName 
 * @param {*} queryKey 
 * @returns 
 */
module.exports = (wdfName) => {

    let funcs = conf[wdfName];
    let queryKey = "d";

    return async (req, res, next) => {
        
        // The game requests data from query
        let func = req.query[queryKey];
        if (!func)
            return next({
                status: 400,
                message: "Missing func query"
            });

        // Check if the func's script file exists
        let funcPath = path.resolve(__dirname, "rooms/", wdfName, func + ".js");
        if (!fs.existsSync(funcPath))
            return next({
                status: 404,
                message: "Unknown func"
            });
        
        let funcScript = await require(funcPath).init;
        let middleware;

        if (funcs && funcs.hasOwnProperty(func)) {
            let funcData = funcs[func];
            let mids = funcData.mid || [];

            req.func = {
                id: funcData.id,
                name: func,
                isJD5: wdfName === "wdf-jd5"
            };

            // for getServerTime, if "sid" and "token" is given in body
            // it means user should be removed from session & lobby
            // so only have nasToken & session / lobby client for serverTime
            // if "sid" and "token" is present in body, if not, it will send basic response
            if (func === "getServerTime" && req.body.token)
                mids = [nasClient.require, gameClient, sessionClient.session, sessionClient.lobby];

            middleware = [...mids, funcScript];
        }
            
        else return next();

        return express.Router().use(middleware)(req, res, next);
    }
};