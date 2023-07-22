
// This is an example service file to use on creating new services.

module.exports = {

    name: `Service Name`,
    description: `Service Description`,
    version: `1.0.0`,

    async init(app, router) {

        router.get("/exampleRoute", (req, res) => {
            return res.send("hello")
        });

    }
}