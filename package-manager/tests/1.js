const { format, parse } = require('lua-json');
const fs = require("fs");

var songdesc = fs.readFileSync(__dirname + "/songdesc.tpl").toString();
songdesc = "return " + songdesc.substring(songdesc.indexOf("{"));

const parsed = parse(songdesc)

fs.writeFileSync("./PARSED", JSON.stringify(parsed))