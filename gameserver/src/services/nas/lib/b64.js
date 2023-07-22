module.exports.serialize = (obj) => {
  return Object.entries(obj).map(([k, v]) => `${k}=${v}`).join("&");
};

module.exports.toJSON = function (str) {
  let result = {};
  let split = str.split("&");

  split = split.map(a => a.replace(/\r/g, ""));
  split = split.map(a => a.replace(/\n/g, ""));

  split.forEach(a => {
    let [ key, val ] = a.split("=");
    result[key] = val;
  });
  return result;
};

module.exports.decode = function(obj) {
  let data = {};

  Object.keys(obj).forEach(key => {
    let value = obj[key];
    value = decodeURIComponent(value);
    value = value.replace(/\*/g, "=");
    
    let b64 = Buffer.from(value, "base64").toString("utf8");
    data[key] = b64;
  });
  
  return data;
};

module.exports.encode = function(str, serialize = true) {
  let data = {};
  
  Object.keys(str).forEach(key => {
    let value = str[key];
    let b64 = Buffer.from(value).toString("base64");
    data[key] = b64.replaceAll(/=/g, "*");
  });
  
  if (serialize)
    return this.serialize(data);
  
  return data;
};