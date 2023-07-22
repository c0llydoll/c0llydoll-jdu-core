const fs = require("fs");
const path = require("path");
const zipdir = require("zip-dir");
const utils = require("./utils");
const spawn = require("child_process").spawn;
const md5File = require("md5-file");
const s3Helper = require("./s3-helper");

class Packages {
    constructor() {};

    async prepareMapContent(mapName, platformData) {
        const s3 = new s3Helper("stream");

        const platformId = platformData.id;
        const mapFolder = utils.tmpFolder(`map/${mapName}/${platformId}/`);
        const packageFolder = path.resolve(__dirname, `../tmp/package/${mapName}/${platformId}/`);
        if (!fs.existsSync(packageFolder)) fs.mkdirSync(packageFolder, { recursive: true });
        if (!fs.existsSync(mapFolder)) 
            throw new Error(`${mapName} does not have platform folder for ${platformData}, how do you expect to pack this?`);
        
        const ipkPath = await this.packToIPK(mapName, platformId, mapFolder, packageFolder);
        await this.createPackageComponents(mapName, packageFolder, platformId, ipkPath);
        const zipData = await zipdir(packageFolder);
        const mainSceneName = `${mapName}_MAIN_SCENE_${platformId.toUpperCase()}.zip`;
        const mainScenePath = path.resolve(packageFolder, `../${mainSceneName}`)
        fs.writeFileSync(mainScenePath, zipData)
        const mainSceneHash = md5File.sync(mainScenePath);
        const s3Path = `/public/map/${mapName}/${platformId}/${mainSceneName}/${mainSceneHash}.zip`;
        s3.putObject(s3Path, fs.readFileSync(mainScenePath));
        try {
            const { res } = await axios({
                method: "POST",
                url: global.secrets.stream.fqdn + "/songdb/v1/songs/packages/" + mapName,
                data: {
                    packages: {
                        [platformId]: {
                            md5: mainSceneHash,
                            storageType: 0,
                            url: global.secrets.s3.fqdn + s3Path
                        }
                    }
                }
            });
            signale.success("Submitted changes to Stream!");
        }
        catch(err) {
            signale.error(`Couldn't submit changed to Stream API: ${err}`);
        };

    };

    packToIPK(mapName, platformId, mapFolder, packageFolder) {
        return new Promise((resolve, reject) => {

            const unpakkePath = path.resolve(__dirname, "../bin/unpakke/Unpakke.exe");
            const modulePath = path.resolve(__dirname, "../bin/unpakke/modules/ubiart.umod");
            const outputIpk = path.resolve(packageFolder, `${mapName.toLowerCase()}_main_scene_${platformId.toLowerCase()}.ipk`);

            const process = spawn(unpakkePath, [modulePath, "pack", mapFolder, outputIpk]);
    
            const out = []
            process.stdout.on('data', (data) => {
                resolve(outputIpk);
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

    async createPackageComponents(mapName, packageFolder, platformId, ipkPath) {
        await this.createSecureFat(platformId, ipkPath);
        fs.writeFileSync(`${packageFolder}/atlascontainer.ckd`, Buffer.from("0000000000000000", "hex"));
        fs.writeFileSync(`${packageFolder}/dlcdescriptor.ckd`, Buffer.from([
            utils.textToHex("JDLC"),
            utils.numToHex(2),
            utils.pathToHex("mapcontent"),
            utils.pathToHex(`${mapName.toLowerCase()}_main_scene`)
        ].join(""), "hex"));
        fs.writeFileSync(`${packageFolder}/sgscontainer.ckd`, "S" + JSON.stringify({
            version: 0,
            sgsMap: {
                __class: "SceneConfigManager::SgsKey",
                Keys: {
                    [`world/maps/${mapName.toLowerCase()}/${mapName.toLowerCase()}_main_scene.isc`]: {
                        __class: "JD_MapSceneConfig",
                        Pause_Level: 6,
                        name: "",
                        type: 1,
                        musicscore: 2,
                        soundContext: "",
                        hud: 0,
                        phoneTitleLocId: 4294967295,
                        phoneImage: ""
                    }
                }
            }
        }));
    };

    createSecureFat(platformId, ipkPath) {
        return new Promise((resolve, reject) => {
            const ipkFolder = path.dirname(ipkPath);
            const process = spawn("python", [path.resolve(__dirname, "../bin/secure-fat-generator/script.py"), ipkFolder, platformId]);
    
            const out = []
            process.stdout.on('data', (data) => {
                resolve();
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
    
};

module.exports = new Packages();