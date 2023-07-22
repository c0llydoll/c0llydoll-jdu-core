const Items = require("../lib/items");

module.exports = (app, public, private, logger) => {

    public.get("/items", async (req, res) => {
        
        var avatars = await Items.getAvatars();
        var skins = await Items.getSkins();

        res.send({
            __class: "OnlineCustomizableItemDb",
            avatars,
            skins
        })

    })

};