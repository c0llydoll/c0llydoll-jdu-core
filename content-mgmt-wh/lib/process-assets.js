const sharp = require('sharp');
const md5File = require("md5-file");
const axios = require("axios");
const mime = require('mime-types');
const logger = require("signale");

const { join, dirname } = require("path");
const { copyFile, existsSync, mkdirSync, renameSync, readFileSync, rmSync } = require("fs");

const conf = (mapName, public, private, isCooked = false) => {
    return {
        bannerBkg: {
            apiId: "banner_bkgImageUrl",
            size: [1024, 512],
            format: isCooked ? "ckd" : "jpg",
            baseName: `${mapName}_banner_bkg`,
            contentType: "image"
        },
        albumCoach: {
            apiId: "expandCoachImageUrl",
            size: [512, 512],
            format: isCooked ? "ckd" : "png",
            baseName: `${mapName}_Cover_AlbumCoach`,
            contentType: "image"
        },
        coach1: {
            apiId: "coach1ImageUrl",
            size: [512, 512],
            format: isCooked ? "ckd" : "png",
            baseName: `${mapName}_Coach_1`,
            contentType: "image"
        },
        coach2: {
            apiId: "coach2ImageUrl",
            size: [512, 512],
            format: isCooked ? "ckd" : "png",
            baseName: `${mapName}_Coach_2`,
            contentType: "image"
        },
        coach3: {
            apiId: "coach3ImageUrl",
            size: [512, 512],
            format: isCooked ? "ckd" : "png",
            baseName: `${mapName}_Coach_3`,
            contentType: "image"
        },
        coach4: {
            apiId: "coach4ImageUrl",
            size: [512, 512],
            format: isCooked ? "ckd" : "png",
            baseName: `${mapName}_Coach_4`,
            contentType: "image"
        },
        cover: {
            apiId: "coverImageUrl",
            size: [512, 512],
            format: isCooked ? "ckd" : "jpg",
            baseName: `${mapName}_Cover_Generic`,
            contentType: "image"
        },
        coverOnline: {
            apiId: "cover_smallImageUrl",
            size: [256, 256],
            format: isCooked ? "ckd" : "jpg",
            baseName: `${mapName}_Cover_Online`,
            parent: "cover",
            contentType: "image"
        },
        mapBkg: {
            apiId: "map_bkgImageUrl",
            size: [2048, 1024],
            format: isCooked ? "ckd" : "png",
            baseName: `${mapName}_map_bkg`,
            contentType: "image"
        },
        phoneCoach1: {
            apiId: "phoneCoach1ImageUrl",
            size: [256, 256],
            format: isCooked ? "ckd" : "png",
            baseName: `${mapName}_Coach_1_Phone`,
            parent: "coach1",
            contentType: "image"
        },
        phoneCoach2: {
            apiId: "phoneCoach2ImageUrl",
            size: [256, 256],
            format: isCooked ? "ckd" : "png",
            baseName: `${mapName}_Coach_2_Phone`,
            parent: "coach2",
            contentType: "image"
        },
        phoneCoach3: {
            apiId: "phoneCoach3ImageUrl",
            size: [256, 256],
            format: isCooked ? "ckd" : "png",
            baseName: `${mapName}_Coach_3_Phone`,
            parent: "coach3",
            contentType: "image"
        },
        phoneCoach4: {
            apiId: "phoneCoach4ImageUrl",
            size: [256, 256],
            format: isCooked ? "ckd" : "png",
            baseName: `${mapName}_Coach_4_Phone`,
            parent: "coach4",
            contentType: "image"
        },
        phoneCover: {
            apiId: "phoneCoverImageUrl",
            size: [256, 256],
            format: isCooked ? "ckd" : "jpg",
            baseName: `${mapName}_Cover_Phone`,
            parent: "cover",
            contentType: "image"
        },
        albumBkg: {
            apiId: "expandBkgImageUrl",
            size: [256, 256],
            format: isCooked ? "ckd" : "jpg",
            baseName: `${mapName}_Cover_AlbumBkg`,
            contentType: "image"
        },
        audioPreview: {
            apiId: `audioPreview`,
            format: "ogg",
            baseName: `${mapName}_AudioPreview`,
            contentType: "audio"
        }
    }
};

async function getFolderContent(path) {
    if (!path.endsWith("/")) path += "/";
    const objectsList = await new Promise((resolve, reject) => {
        const objectsListTemp = [];
        const stream = global.s3.listObjectsV2(global.config.s3Bucket, path);

        stream.on('data', obj => objectsListTemp.push(obj));
        stream.on('error', reject);
        stream.on('end', () => {
            // Sort all objects by earliest to latest date
            objectsListTemp.sort((a, b) => new Date(a.lastModified) - new Date(b.lastModified));
            resolve(objectsListTemp);
        });
    });
    return objectsList;
};

async function putObject(path, data, metadata = {}) {
    return await global.s3.putObject(global.config.s3Bucket, path, data, metadata);
};

async function updateStreamData(mapName, data) {
    const endPoint = (global.config.streamUseSSL ? "https://" : "http://") + global.config.streamEndpoint;
    try {
        await axios({
            method: "POST",
            url: `${endPoint}/songdb/v1/songs/packages/${mapName}`,
            data
        });
        return;
    }
    catch(err) {
        throw new Error(err);
    }
};

const s3Endpoint = (global.config.s3UseSSL ? "https://" : "http://") + global.config.s3Endpoint;

module.exports = async (data) => {

    const mapName = data.mapName;
    const public = `public/map/${mapName}`;
    const private = `private/map/${mapName}`;
    const assetConf = conf(mapName, public, private);
    const assetKeys = Object.keys(assetConf);
    const package = {
        assets: {}
    };
    console.log(data)

    // Loop through all asset keys (albumcoach banner...)
    // and get their MD5, upload to S3 and Stream API
    await Promise.all(assetKeys.map(async (key) => {
        const config = assetConf[key];
        if (!config) return;

        let obj = data[key];
        if (config.parent && data[config.parent]) {
            if (!data[config.parent].url) console.log("FSUHDFOSDJHFUDS", data[config.parent])
            obj = {
                url: data[config.parent].url
            }
        }
        if (!obj || !obj.url) return;


        // Resolve path to the assets in content mgmt local folder
        const sourceFile = join(global.config.mgmtRoot, "public", obj.url);
        if (!existsSync(sourceFile)) throw new Error(sourceFile + " does not exist!");

        // Move assets from mgmt to tmp folder in hook and process them
        const outputFileName = config.baseName + "." + config.format;
        const outputPath = join(global.root, "tmp", mapName, outputFileName);
        // Create tmp folder for mapName if not exists
        if (!existsSync(dirname(outputPath))) mkdirSync(dirname(outputPath), {recursive: true});

        // Check if the content is an image, audio or video
        switch (config.contentType) {
            default:
            case "image":
                // Process image (we still didnt cook or md5 them) and save to tmp/mapname
                // 1. resize
                await sharp(sourceFile)
                .resize({
                    width: config.size[0],
                    height: config.size[1]
                })
                .toFile(outputPath);
                
                // Cook textures for platforms (TODO)
                // -
                break;
            case "audio":
                await copyFileToTmp(sourceFile, outputPath, (err) => {
                    if (err) return err;
                })
                break;
            case "video":
                break;
            case "files":
                await copyFileToTmp(sourceFile, outputPath, (err) => {
                    if (err) return err;
                })
                break;
        }

        // Calculate md5 hash of processed image
        const md5 = md5File.sync(outputPath);
        const md5FileName =  md5 + "." + config.format;
        const md5OutputPath = join(global.root, "tmp", mapName, md5FileName);

        // Rename assets from tmp/mapname/mapname_cover_albumcoach.png to their md5 name
        renameSync(outputPath, md5OutputPath);

        // Upload assets to S3
        const cdnFolder = `${public}/${config.baseName + "." + config.format}/`;
        const cdnPath = cdnFolder + md5FileName;

        // Get folder content of dir of cdn url
        const folderContent = await getFolderContent(cdnFolder);
        const assetAlreadyExists = folderContent.find(a => a.etag === md5) ? true : false;
    
        // If an asset with the same md5 exists in directory, don't upload the asset
        if (!assetAlreadyExists)  {
            await putObject(cdnPath, readFileSync(md5OutputPath), {
                "Content-Type": mime.lookup(config.format),
            });
        };
        
        package.assets[config.apiId] = s3Endpoint + "/" + global.config.s3Bucket + "/" + cdnPath;
        
        console.log(key, "md5 is", md5, config.baseName, folderContent, "assetAlreadyExists", assetAlreadyExists)
    }))
    .then(async () => {

        // Update Stream API
        if (Object.keys(package.assets).length > 0) 
            await updateStreamData(mapName, package);

        logger.success(`Updated assets of ${mapName}`);
        console.log(package);

        // Remove tmp/mapName folder
        rmSync(join(global.root, "tmp", mapName), { recursive: true, force: true });
    });

};

async function copyFileToTmp(sourceFile, outputPath, callback) {
    await copyFile(sourceFile, outputPath, (err) => {
        if (err) return callback(err);
        else setTimeout(() => {}, 1000);
    })
}