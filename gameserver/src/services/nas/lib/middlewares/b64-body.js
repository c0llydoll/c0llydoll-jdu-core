module.exports = function(req, res, next) {
  req.body = require("../b64").decode(req.body)
  return next();
}