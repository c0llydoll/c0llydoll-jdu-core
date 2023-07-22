const fs = require("fs");
const path = require("path");
const spawn = require('child_process').spawn;
const gm = require('gm').subClass({ imageMagick: '7+' });


const utils = require("./utils");
const signale = require("signale");

class Texture {
    constructor() {
        this.cookHeader = "00000009544558000000002C0001008001000100000120000001008000000000000000000000000000000000";
    };

    async processPictos(cacheFolder, platformData) {
        try {
            const pictosFolder = "./map/Timeline/Pictos/"; // pictos folder
            const supported = ["png", "tga"]; // only allowed image types
            const format = platformData.textureFormat; // platform format to convert to
            if (!fs.existsSync(pictosFolder)) signale.warn("This map does not have a pictos folder!");

            const pictos = fs.readdirSync(pictosFolder);
            for (let i = 0; i < pictos.length; i++) {
                const [pictoName, pictoExt] = pictos[i].split(".");
                const pictoPath = pictosFolder + pictos[i];
                if (!fs.statSync(pictoPath).isFile()) continue;

                const ddsPath = utils.tmpFolder(`pictos/${pictoName}.dds`);
                const gtxPath = utils.tmpFolder(`pictos/${pictoName}.gtx`);
                const outputPath = `${cacheFolder}/timeline/pictos/${pictoName}.${pictoExt}.ckd`;

                let texData;

                // 1. convert to dds
                const ddsData = await this.toDDS(pictoPath, ddsPath);
                // 2. if platform format is raw dds, just cook and save
                if (format == "DDS") {
                    fs.writeFileSync(outputPath, this.cookTexture(ddsData));
                }
                // 2. if platform format is gtx, convert dds to gtx and cook
                else if (format == "GTX") {
                    const gtxData = await this.toGTX(ddsPath, gtxPath);
                    fs.writeFileSync(outputPath, this.cookTexture(gtxData));
                };
            };
        }
        catch (err) {
            throw new Error(`Cannot process pictos: ${err}`);
        };
    };

    toDDS(inputPath, ddsPath) {
        return new Promise((resolve, reject) => {
            if (fs.existsSync(ddsPath)) resolve(fs.readFileSync(ddsPath));
            gm(inputPath)
            .resize(256, 256)
            .write(ddsPath, function (err) {
                if (err) reject(err);
                resolve(fs.readFileSync(ddsPath));
            });
        });
    };
    toGTX(ddsPath, gtxPath) {
        return new Promise((resolve, reject) => {
            if (fs.existsSync(gtxPath)) resolve(fs.readFileSync(gtxPath));
            const process = spawn("python", [path.resolve(__dirname, "../bin/gtx-extractor/gtx_extract.py"), ddsPath]);
    
            const out = []
            process.stdout.on('data', (data) => {
                resolve(fs.readFileSync(gtxPath));
            });
    
            const err = []
            process.stderr.on('data', (data) => {
                err.push(data.toString());
            });
    
            process.on('exit', (code, signal) => {
                if (code === 0) resolve();
                else reject(new Error(err.join('\n')));
            });
        });
    };

    cookTexture(texData) {
        return Buffer.concat([Buffer.from(this.cookHeader, "hex"), texData]);
    };

};

module.exports = new Texture();