const Items = require("../lib/items");

module.exports = (app, public, private, logger) => {

    public.get("/avatars", async (req, res) => {
        
        var avatars = await Items.getAvatars();

        res.send({
            __class: "OnlineAvatarDb",
            avatars: avatars
        })

    })

};