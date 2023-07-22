module.exports = (app, public, private, logger) => {

    public.post("/refresh", (req, res) => {
        return res.send({
            "validity": false,
            "errorCode": "",
            "timeLeft": 0,
            "expiryTimeStamp": "1771172820", // 6 years
            "platformId": req.body["deviceId"],
            "trialActivated": false,
            "consoleHasTrial": true,
            "trialDuration": "90",
            "trialIsActive": false,
            "needEshopLink": false
        });
    });

};