const CODEC_VP8 = "libvpx";
const CODEC_VP9 = "libvpx-vp9";
const CODEC_LIBVORBIS = "libvorbis";

module.exports = {
    platforms: [{ 
        id: "nx",
        enabled: true,
        codec: { 
            videoscoach: CODEC_VP8, 
            videopreview: CODEC_VP9,
            audiopreview: CODEC_LIBVORBIS,
            audio: CODEC_LIBVORBIS
        },
        quality: { videoscoach: "basic" }
    }, { 
        id: "wiiu",
        enabled: true,
        codec: {
            videoscoach: CODEC_VP8, 
            videopreview: CODEC_VP8,
            audiopreview: CODEC_LIBVORBIS,
            audio: CODEC_LIBVORBIS
        },
        quality: { videoscoach: "basic" }
    }, { 
        id: "pc",
        enabled: true,
        codec: {
            videoscoach: CODEC_VP8, 
            videopreview: CODEC_VP8,
            audiopreview: CODEC_LIBVORBIS,
            audio: CODEC_LIBVORBIS
        },
        quality: { videoscoach: "basic" }
    }].filter(p => p.enabled),

    secrets: {
        s3: {
            endPoint: "s3.danceparty.online",
            useSSL: true,
            accessKey: "AnDUMcMTH1WgYu5m",
            secretKey: "m4SVUzacHuejOm0xDnavQKbu3A3WuHlK",
            bucket: "stream",
            bucketLocalization: "stream-localization"
        },
        stream: {
            endPoint: "https://stream-api.danceparty.online"
        }
    }
};