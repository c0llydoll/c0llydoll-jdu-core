
// Database configuration per service and per enviroment.
module.exports = {
    jmcs: {
        local: "mongodb://127.0.0.1:27017/dp-legacy-local",
        prod: "mongodb://127.0.0.1:27017/dp-legacy-prod",
        dev: "mongodb://127.0.0.1:27017/dp-legacy-dev",
        beta: "mongodb://127.0.0.1:27017/dp-legacy-beta"
    },
    wdf: {
        local: "mongodb://127.0.0.1:27017/dp-legacy-local",
        prod: "mongodb://127.0.0.1:27017/dp-legacy-prod",
        dev: "mongodb://127.0.0.1:27017/dp-legacy-dev",
        beta: "mongodb://127.0.0.1:27017/dp-legacy-beta",
        test: "mongodb://127.0.0.1:27017/dp-legacy-test"
    }
}