class Uenc {
    constructor() {}

    client = require("./uenc-client")

    /**
     * Serializes given data for JMCS and WDF.
     * JMCS uses classic urlParams like "name=Hello&score=12450"
     * WDF uses urlParams but with semicolons like "song=Problem;total=50"
     * If you want to, you can also set the index resulting in "name0=Jennie;score0=130;name1=Rose;score1=450"
     * @param {(string|Array)} data Object or array to serialize
     * @param {Boolean} setIndex If you want to set index of each key in data
     * @param {Number} offset If setIndex is set, you can set the index's offset
     * @returns {String}
     */
    serialize(data, setIndex = false, offset = 0, indexSep = "") {
        let seperator = global.service.id === "wdf" ? ";" : "&";
        let result = [];

        // If given data is an array
        // - If setIndex is true, it will indexify each data in array and turn to an object
        // - If not, it will flatten the array to an object
        if (Array.isArray(data)) {
            if (setIndex) data = this.setIndex(data, offset, indexSep);
            else data = this.flatArray(data);
        };

        // Transform data to url encoded format
        // URLSearchParams was used before but it was encoding data keys which would cause in a crash 
        Object.entries(data).map(([k, v]) => { 
            v = encodeURIComponent(v); // Only encode value
            result.push(`${k}=${v}`);
        });
        
        return result.join(seperator);
    }

    deserialize(data) {}

    /**
     * Sets index of given data's keys
     * @param {Array} data Data to "indexify"
     * @param {Number} offset Index offset
     * @param {String} sep Seperator 
     * @returns 
     */
    setIndex(data = [ data ], offset = 0, sep = "") {
        let result = {};
        data.forEach((obj, i) => {
            i += offset;
            Object.entries(obj).map(([k, v]) => { result[`${k}${sep}${i}`] = v; });
            i = 0;
        });
        return result;
    }

    /**
     * Turns array of objects to an object
     * @param {*} data 
     * @returns 
     */
    flatArray(data) {
        let result = {};
        data.forEach((obj, i) => {
            Object.entries(obj).map(([k, v]) => { result[k] = v; });
        });
        return result;
    }
};

module.exports = new Uenc();