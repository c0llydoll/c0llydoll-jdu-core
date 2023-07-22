const spaces = require("../lib/spaces");
const ticketClient = require("../lib/harbour-ticket-client");

module.exports = (app, public, private) => {
    
    public.get("/:spaceId/entities", ticketClient.require, async (req, res, next) => {
        const spaceId = req.params.spaceId;
        if (!spaces.isSpaceAvailable(spaceId)) return next({
            status: 400,
            message: `${spaceId} is not an existing space.`
        });
        const entities = spaces.getEntities(spaceId);
        return res.send({ entities });
    });

    public.get("/:spaceId/configs/events", ticketClient.require, async (req, res, next) => {
        const spaceId = req.params.spaceId;
        if (!spaces.isSpaceAvailable(spaceId)) return next({
            status: 400,
            message: `${spaceId} is not an existing space.`
        });
        const events = spaces.getEvents(spaceId);
        return res.send({ config: events });
    });
};