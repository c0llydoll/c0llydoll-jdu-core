module.exports = (app, public, private, logger) => {

    public.get("/active-contest", (req, res) => {
        return res.send();
    });
    
};