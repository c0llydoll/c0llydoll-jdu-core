const Bosses = require("../lib/bosses");

module.exports = (app, public, private, logger) => {

    public.post("/assign-room", (req, res) => {
        return res.send({
            room: "TESTROOM"
        });
    });

    public.get("/server-time", (req, res) => {
        return res.send({
            time: Date.now() / 1000
        });
    });

    public.get("/online-bosses", async (req, res) => {
        var bosses = await Bosses.getBosses();

        return res.send({
            "__class":"OnlineBossDb",
            bosses
        });
    });

    public.post("/:room/screens", (req, res) => {
        res.send({"__class":"ScreenList","screens":[]})
    })

    public.get("/:room/ccu", (req, res) => {
        res.send("0")
    })

};