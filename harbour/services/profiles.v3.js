const uuid = require("uuid");
const logger = require("signale");

const usHelper = require("../lib/us-helper");
const profileDb = require("../lib/models/profile");
const harbourTicket = require("../lib/harbour-ticket");
const appsClient = require("../lib/apps-client");
const session = require("../lib/session");

module.exports = (app, public, private) => {
    
    public.post("/sessions", appsClient.auth, async (req, res, next) => {

        const serverTime = new Date();

        const ip = req.ipInfo.ip;
        const token = req.headers.authorization;
        const appId = req.headers["ubi-appid"];
        const userAgent = req.headers["test-agent"] || req.headers["user-agent"];
        const buildId = req.headers["ubi-appbuildid"];

        const us = new usHelper(ip, appId, userAgent, buildId);

        // Get client's session data from UbiServices
        // This also helps verify the access
        const usSession = await us.getSession(token);
        if (!usSession) return next({
            status: 401,
            message: `Can't fetch session from US!`
        });
        const { 
            ticket: usTicket, userId, profileId, 
            country, username, nameOnPlatform, platformType
        } = usSession;

        // Get client's user data from UbiServices
        const userData = await us.getUserMe(usTicket);

        // If client's userId & profileId 
        // does not have a profile in our DB, create a new profile
        const profileExists = await profileDb.exists({ userId, profileId });
        if (!profileExists) {
            const newProfile = new profileDb({
                userId, profileId,
                ...userData
            });
            await newProfile.save();
        };

        // Get client's profile from DB
        const profile = await profileDb.findOne({ userId, profileId });

        // Create a new session and sign a ticket for client
        const sessionExpiration = global.config.SECRETS.harbour.options.expiresIn;
        const sessionId = uuid.v4();
        const payload = {
            aid: appId,
            sid: sessionId,
            uid: userId,
            pid: profileId,
            nop: nameOnPlatform,
            c: country,
            u: username,
            env: global.env
        };
        await session.newSession(sessionId, payload, sessionExpiration);
        const ticket = harbourTicket.sign(payload);

        logger.info(`${nameOnPlatform} created a new session for ${req.app.name} with ${platformType}!`);
        
        return res.send({
            platformType: platformType,
            ticket: ticket,
            twoFactorAuthenticationTicket: null,
            profileId: profileId,
            userId: userId,
            nameOnPlatform: nameOnPlatform,
            environment: "Prod",
            expiration: new Date(serverTime.getTime() + (sessionExpiration * 1000)).toISOString(),
            spaceId: req.spaceId,
            clientIp: req.ipInfo.ip,
            clientIpCountry: req.ipInfo.country || "US",
            serverTime: serverTime,
            sessionId: sessionId,
            sessionKey: "hvLf0lvUBliFYPtIAcFI5UNrdOrIohFPd+XFB7v3Lu24ZSb5vzIvdLzG7NGYxSjptIfFFlHlg2U8YFuc/73dsQ==",
            rememberMeTicket: null,
        });
    });
};