const VIDEOSCOACH_VP8_ULTRA = {
    resolution: "scale=w=1216:h=720",
    qmin: 0,
    qmax: 51,
    videobitrate: "8000k",
    maxrate: "8000k",
    minrate: "8000k",
    buffersize: "8000k",
};
const VIDEOSCOACH_VP8_HIGH = {
    resolution: "scale=w=1216:h=720",
    qmin: 11,
    qmax: 51,
    videobitrate: "4000k",
    maxrate: "4000k",
    minrate: "4000k",
    buffersize: "4000k",
};
const VIDEOSCOACH_VP8_MID = {
    resolution: "scale=w=768:h=432",
    qmin: 11,
    qmax: 63,
    videobitrate: "2000k",
    maxrate: "2000k",
    minrate: "2000k",
    buffersize: "2000k",
};
const VIDEOSCOACH_VP8_LOW = {
    resolution: "scale=w=480:h=270",
    qmin: 11,
    qmax: 63,
    videobitrate: "500k",
    maxrate: "500k",
    minrate: "500k",
    buffersize: "500k",
};

const VIDEOPREVIEW_ULTRA_VP8 = {
    videobitrate: "6000k",
    maxrate: "6000k",
    minrate: "6000k",
    buffersize: "6000k"
};
const VIDEOPREVIEW_HIGH_VP8 = {
    videobitrate: "3000k",
    maxrate: "3000k",
    minrate: "3000k",
    buffersize: "3000k"
};
const VIDEOPREVIEW_MID_VP8 = {
    videobitrate: "1500k",
    maxrate: "1500k",
    minrate: "1500k",
    buffersize: "1500k"
};
const VIDEOPREVIEW_LOW_VP8 = {
    videobitrate: "650k",
    maxrate: "650k",
    minrate: "650k",
    buffersize: "650k"
};

module.exports = {
    videoscoach: {
        basic: {
            libvpx: {
                ULTRA: VIDEOSCOACH_VP8_ULTRA,
                HIGH: VIDEOSCOACH_VP8_HIGH,
                MID: VIDEOSCOACH_VP8_MID,
                LOW: VIDEOSCOACH_VP8_LOW,
            }
        },
        // hd: {
        //     libvpx: {
        //         ULTRA: VP8_ULTRA_HD,
        //         HIGH: VP8_HIGH_HD,
        //         MID: VP8_MID_HD,
        //         LOW: VP8_LOW_HD,
        //     }
        // }
    },
    videopreview: {
        libvpx: {
            ULTRA: VIDEOPREVIEW_ULTRA_VP8,
            HIGH: VIDEOPREVIEW_HIGH_VP8,
            MID: VIDEOPREVIEW_MID_VP8,
            LOW: VIDEOPREVIEW_LOW_VP8,
        },
        "libvpx-vp9": {
            ULTRA: VIDEOPREVIEW_ULTRA_VP8,
            HIGH: VIDEOPREVIEW_HIGH_VP8,
            MID: VIDEOPREVIEW_MID_VP8,
            LOW: VIDEOPREVIEW_LOW_VP8,
        }
    },
    audiopreview: "",
    audio: ""
};