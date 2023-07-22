const lua = require("lua-json");
const fs = require("fs");

class Lua {
    constructor() {};

    parseLua(luaStr, path) {
        try {
            if (!luaStr.startsWith("return "))
            luaStr = "return " + luaStr.substring(luaStr.indexOf("{"));
        
            luaStr = luaStr.substr(0, luaStr.lastIndexOf("}") + 1);

            return lua.parse(luaStr);
        }
        catch(err) {
            throw new Error(`Can't parse LUA file from path ${path}: ${err}`);
        };
    };

    parseLuaFile(path) {
        const file = fs.readFileSync(path).toString();
        return this.parseLua(file, path);
    };

    reduceArrayToObject(array = []) {
        return Object.fromEntries((array).map(({ KEY, VAL }) => [ KEY, VAL ]));
    };

    reduceArray(array = []) {
        return array.map(arr => arr.VAL);
    };
};

module.exports = new Lua();