require("dotenv").config();

const fs = require("fs");
const path = require("path");
const signale = require("signale");
const inquirer = require("inquirer");
const md5File = require("md5-file");
const axios = require("axios");
const mime = require("mime-types");

const config = require("./config");
const presets = require("./presets");

const lua = require("./lib/lua");
const ffmpeg = require("./lib/ffmpeg");

global.config = config;
global.secrets = config.secrets;

(async() => {

    await require("./lib/load-clients")();

    const S3Helper = require("./lib/s3-helper");
    const s3 = new S3Helper("stream");

    const jobs = [];
    
    // Prepare all jobs
    Object.keys(presets).forEach(presetType => {
        const presetData = presets[presetType];

        config.platforms.forEach(platform => {

            const codec = platform.codec[presetType];
            const quality = platform.quality[presetType];

            const jobExists = jobs.find(j => j.type == presetType && j.codec == codec && j.quality == quality);
            if (jobExists) return;

            let preset = "";
            switch(presetType) {
                case "videoscoach":
                    preset = presetData[quality][codec];
                    break;
                case "videopreview":
                    preset = presetData[codec];
                    break;
                default:
                    preset = presetData;
            };

            jobs.push({
                type: presetType,
                codec: codec,
                quality: quality,
                preset
            });

        });
    });

    const mapFolderContent = fs.readdirSync("./map");

    const { mapName } = await inquirer.prompt([{
        type: "input",
        name: "mapName",
        message: "Please enter mapName"
    }]);

    // Guess and find the video file of mapName
    let videoPath;
    [`${mapName}.mp4`, `${mapName}_ULTRA.hd.webm`, `${mapName}_ULTRA.webm`].forEach(f => {
        const p = path.resolve("./map/", f);
        if (fs.existsSync(p)) videoPath = p
    });
    if (!videoPath) throw new Error(`Couldn't find ${mapName} video file... Contact devs!`);

    let trkPath = path.resolve(`./map/${mapName}.trk`);
    if (!fs.existsSync(trkPath)) throw new Error(`Couldn't find ${mapName} TRK file... Contact devs!`);

    let wavPath = path.resolve(`./map/${mapName}.wav`);
    if (!fs.existsSync(wavPath)) throw new Error(`Couldn't find ${mapName} WAV file... Contact devs!`);

    signale.info(`Found video file: ${videoPath}`);
    signale.info(`Found audio file: ${wavPath}`);
    signale.info(`Found track file: ${trkPath}`);

    fs.mkdirSync("./output", {recursive: true});
    // fs.mkdirSync("./output/videopreview", {recursive: true});

    const trkData = lua.parseLuaFile(trkPath)["MusicTrackStructure"];
	const markers = lua.reduceArray(trkData.markers);
	const previewEntry = trkData.previewEntry;
	const previewStartTime = (markers[previewEntry] / 48000) - trkData.videoStartTime;
	const previewEndTime = previewStartTime + 30;
    
    // Loop through all jobs
    for (let i = 0; i < jobs.length; i++) {
        const { type, codec, quality, preset } = jobs[i];

        // If job type is videoscoach
        if (type == "videoscoach") {
            // Loop through ULTRA HIGH MID LOW
            const entries = Object.entries(preset);

            for (let i = 0; i < entries.length; i++) {
                const [q, p] = entries[i];
                const c = (codec === "libvpx") ? "vp8" : "vp9";
                const fileName = c == "vp8" ? `${mapName}_${q}.webm` : `${mapName}_${q}.${c}.webm`;
                const outputPath = path.resolve(`./output/${fileName}`);

                signale.info(`Converting ${fileName}...`);

                // 2 pass so there are 2 webm commands
                await ffmpeg(`ffmpeg -y -i ${videoPath} -c:v libvpx -pass 1 -g 25 -keyint_min 25 -f null -reserve_index_space 16384 -quality good -lag-in-frames 16 -qmin ${p.qmin} -qmax ${p.qmax} -minrate ${p.minrate} -maxrate ${p.maxrate} -vb ${p.videobitrate} -an -bufsize ${p.buffersize} -threads 8 -speed 4 -profile:v 2 -slices 2 -dash 1 -an -filter_complex \"[0:0]format=rgb24, ${p.resolution}:flags=bicubic+accurate_rnd+full_chroma_int+full_chroma_inp, setsar=1/1,fps=25\" - && ffmpeg -y -i ${videoPath} -c:v libvpx -pass 2 -g 25 -keyint_min 25 -f webm -reserve_index_space 16384 -quality good -lag-in-frames 16 -qmin ${p.qmin} -qmax ${p.qmax} -minrate ${p.minrate} -maxrate ${p.maxrate} -vb ${p.videobitrate} -an -bufsize ${p.buffersize} -threads 8 -speed 4 -profile:v 2 -slices 2 -dash 1 -an -filter_complex \"[0:0]format=rgb24, ${p.resolution}:flags=bicubic+accurate_rnd+full_chroma_int+full_chroma_inp, setsar=1/1,fps=25\" ${outputPath}`);

                signale.success(`Converted ${fileName} successfully!`);
            };
        };

        // // If job type is videopreview
        if (type == "videopreview") {
            // Loop through ULTRA HIGH MID LOW
            const entries = Object.entries(preset);

            for (let i = 0; i < entries.length; i++) {
                const [q, p] = entries[i];
                const c = (codec === "libvpx") ? "vp8" : "vp9";
                const fileName = `${mapName}_MapPreviewNoSoundCrop_${q}.${c}.webm`;
                const outputPath = path.resolve(`./output/${fileName}`);

                const croppedPixels = 93;
                const filterCropSection = `in_w:in_h-${croppedPixels}:0:${croppedPixels / 2}`;

                signale.info(`Converting ${fileName}...`);
                await ffmpeg(`ffmpeg -y -ss ${previewStartTime} -stats -i ${videoPath} -pix_fmt yuv420p -vsync 0 -avoid_negative_ts make_zero -frames:v 750 -muxpreload 0 -muxdelay 0 -c:v ${codec} -g 25 -keyint_min 25 -f webm -reserve_index_space 16384 -minrate ${p.minrate} -maxrate ${p.maxrate} -vb ${p.videobitrate} -threads 8 -speed 4 -slices 2 -tile-columns 6 -auto-alt-ref 1 -an -frame-parallel 1 -dash 1 -muxdelay 0 ${c == "vp9" ? "-colorspace bt470bg" : ""} -filter_complex \"[0:0]format=rgb24, fade=in:0:12, fade=out:700:50, crop=${filterCropSection}, scale=w=720:h=370:flags=bicubic+accurate_rnd+full_chroma_int+full_chroma_inp, setsar=1/1\" ${outputPath}`);
                signale.success(`Converted ${fileName} successfully!`);
            };
        };

        // // If job type is audiopreview
        if (type == "audiopreview") {
            const fileName = `${mapName}_AudioPreview.ogg`;
            const outputPath = path.resolve(`./output/${fileName}`);

            signale.info(`Converting ${fileName}...`);

            await ffmpeg(`ffmpeg -y -i ${wavPath} -ss ${previewStartTime} -to ${previewEndTime} ${outputPath}`);

            signale.success(`Converted ${fileName} successfully!`);
        };

        // // If job type is audio
        if (type == "audio") {
            const fileName = `${mapName}.ogg`;
            const outputPath = path.resolve(`./output/${fileName}`);

            signale.info(`Converting ${fileName}...`);

            await ffmpeg(`ffmpeg -y -i ${wavPath} ${outputPath}`);
            
            signale.success(`Converted ${fileName} successfully!`);
        };
    };

    signale.info("Uploading all files to S3...");
    
    const s3Url = (global.config.secrets.s3.useSSL ? "https://" : "http://") + global.config.secrets.s3.endPoint + "/" + global.config.secrets.s3.bucket
    const urls = {};
    const outputFolder = fs.readdirSync("./output/");

    for (let i = 0; i < outputFolder.length; i++) {
        const fileName = outputFolder[i];
        const filePath = path.resolve("./output", fileName);
        if (!fs.statSync(filePath).isFile()) continue;

        const hash = md5File.sync(filePath);
        const [ ext ] = fileName.split(".").slice(-1);

        const isPublic = (fileName.includes("AudioPreview") || fileName.includes("MapPreviewNoSoundCrop"));
        const isPrivate = (!isPublic);

        const public = `/public/map/${mapName}/${fileName}/${hash}.${ext}`;
        const private = `/private/map/${mapName}/${fileName}/${hash}.${ext}`;

        await s3.putObject((isPublic ? public : private), fs.readFileSync(filePath), {
            "Content-Type": mime.lookup(fileName),
        });
        urls[`jmcs://jd-contents/${mapName}/${fileName}`] = s3Url + (isPublic ? public : private);

        signale.success(`Uploaded ${fileName} to S3 successfully!`);
    };
    signale.success("Uploaded all files to S3!");
    signale.info("Submitting change to Stream API...");

    try {
        const { res } = await axios({
            method: "POST",
            url: global.secrets.stream.endPoint + "/songdb/v1/songs/packages/" + mapName,
            data: {
                urls
            }
        });
        signale.success("Submitted changes to Stream!");
    }
    catch(err) {
        signale.error(`Couldn't submit changed to Stream API: ${err}`);
    };

})(); 