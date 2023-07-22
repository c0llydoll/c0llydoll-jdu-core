module.exports = {
    apps: [{
        name: "stream",
        script: "./server.js",
        env_production: {
            NODE_ENV: "prod"
        },
        env_development: {
            NODE_ENV: "dev"
        },
        env_local: {
            NODE_ENV: "local"
        }
    }]
};