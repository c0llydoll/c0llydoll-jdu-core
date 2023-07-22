module.exports = {
    port: 1338,

    platforms: [
        { id: "pc", cook: true, textureFormat: "dds" },
        { id: "nx", cook: true, textureFormat: "tex" },
        { id: "wiiu", cook: true, textureFormat: "tex" }
    ],

    s3Endpoint: "s3.danceparty.online",
    s3UseSSL: true,
    s3AccessKey: "AnDUMcMTH1WgYu5m",
    s3SecretKey: "m4SVUzacHuejOm0xDnavQKbu3A3WuHlK",
    s3Bucket: "stream",
    s3LocBucket: "stream-localization",

    mgmtEndpoint: "content-mgmt.danceparty.online",
    mgmtUseSSL: true,
    mgmtRoot: "/root/dp/content-mgmt", // mgmt and hook must be in the same server!
    mgmtApiToken: "89c5c90243af018e9fd5d2a0016348d53f6e2f78502d392d56ce1402d25a5a522a58aeb53d1d0ec5875e633bc092762ac5c7653f804a46b77ecbc8fe5b9a34548ffb22fd1b20a108abe47df3142d523fe1817f870546ce03c9d1d6e8fbb69ff681f2913797684bb645c8fff12bdefbcc90b79e913e9a26f6a55dac5662adbcc4",

    streamEndpoint: "stream-api.danceparty.online",
    streamUseSSL: true
};