class Bloombergs {

    constructor(version) {
        this.version = version;
        if (!games.isGameAvailable(this.version))
            throw new Error(`${version} is not available for use!`);
       
        this.version = version;
    }

    register(country, data) {}

}