class Cache {
    constructor() {
        this.m = global.memcached;
    }

    async set(key, value, expires) {
        try {
            let data = value;
            if (Array.isArray(data) || typeof data == "object")
                data = JSON.stringify(data);
            await this.m.set(key, data, { expires });
            return value;
        }
        catch(err) {
            throw new Error(`Can't save ${key} to cache: ${err}`);
        }
    }

    async get(key) {
        const { value } = await this.m.get(key);
        try {
            return JSON.parse(value);
        }
        catch(err) {
            if (!err) return null;
            throw new Error(err);
        }
    }
}

module.exports = new Cache();