module.exports = (app, public, private, logger) => {

    public.get("/com-videos-fullscreen", (req, res) => {
        return res.send([]);
    });
    
};