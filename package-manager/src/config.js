module.exports = {
    platforms: [
        {
            id: "nx",
            enabled: false,
            textureFormat: "DDS"
        }, {
            id: "pc",
            enabled: true,
            textureFormat: "DDS"
        }, {
            id: "wiiu",
            enabled: false,
            textureFormat: "GTX"
        }, {
            id: "orbis",
            enabled: false,
            textureFormat: "DDS"
        }
    ].filter(p => p.enabled),

    secrets: {
        s3: {
            fqdn: "https://s3.danceparty.online/stream",
            endPoint: "s3.danceparty.online",
            useSSL: true,
            accessKey: "AnDUMcMTH1WgYu5m",
            secretKey: "m4SVUzacHuejOm0xDnavQKbu3A3WuHlK",
            bucket: "stream",
            bucketLocalization: "stream-localization"
        },
        stream: {
            fqdn: "https://stream-api.danceparty.online"
        }
    }
};