
const axios = require("axios");
const uuid = require("uuid");

const nasToken = require("nas-token");
const b64 = require("../lib/b64");

const games = require("games");

module.exports = function (req, res, next) {

  const { action } = req.body;

  axios({
    method: "POST",
    url: `http://nas.wiimmfi.de/ac`,
    headers: {
      "User-Agent": "RVL SDK/1.0",
      "X-Forwarded-For": req.ip,
      HTTP_X_GAMECD: req.headers.HTTP_X_GAMECD || ""
    },
    data: b64.encode(req.body)
  })
    .then(ac => {

      let response = b64.decode(b64.toJSON(ac.data));

      switch (action) {

        case "svcloc":

          const { userid, lang, region, gamecd, macadr } = req.body;

          const isGameAvailable = games.isGameAvailable(gamecd);
          if (!isGameAvailable) {
            return next({
              status: 401,
              message: `Unknown or unavailable game ${gamecd}`
            });
          };

          // Generate a random sessionId
          const sessionId = Math.floor(Math.random() * 100000000) + 999999999;

          let newToken = nasToken.encrypt({
            sid: sessionId.toString(),
            uid: userid,
            gid: gamecd,
            mac: macadr,
            // loc: lang.toString(),
            // rgn: region.toString(),
            exp: Date.now() + (global.gs.TOKEN_EXPIRATION * 1000)
          });

          global.logger.success(`[AC] ${userid} created token for ${gamecd} // sid: ${sessionId} // reg: ${region}`)

          response.token = newToken;
          response.servicetoken = newToken;
          break;
      };

      return res.send(
        b64.encode(response)
      );
    })
    .catch(err => {
      global.logger.error(`[AC] Error on Wiimmfi end: ${err.message}`);
      console.log(err.response.data)
      return next({
        status: 500,
        message: `Can't connect to Wiimmfi`,
        error: err.message
      });
    });
};