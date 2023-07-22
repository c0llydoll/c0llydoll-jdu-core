const morgan = require("morgan");
const utils = require("utils");

module.exports = (logger = global.logger) => {
  
  const stream = {
    write: (message) => logger.http(message.trim()),
  };

  return morgan(
    ":remote-addr :method :url :status :res[content-length] - :response-time ms",
    { 
      stream
    }
  );
};