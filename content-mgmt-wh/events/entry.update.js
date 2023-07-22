const { resolve } = require("path");
const { existsSync } = require("fs");

module.exports = async (data) => {
    const { model, event } = data;

    const modelPath = resolve(global.root, "models", model + ".js");
    if (!existsSync(modelPath)) throw new Error("unknown model");

    return await require(modelPath)(event.split(".")[1], data.entry);
};