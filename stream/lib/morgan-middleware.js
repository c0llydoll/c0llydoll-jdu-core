const morgan = require("morgan");
const utils = require("./utils");

/**
 * Handles HTTP request logging
 * @param {*} logger 
 * @returns 
 */
module.exports = (logger) => {
  const stream = {
    write: (message) => logger.http(message.trim()),
  };

  return morgan(
    ":remote-addr :method :url :status :res[content-length] - :response-time ms",
    { 
      stream,
      skip: null
    }
  );
};