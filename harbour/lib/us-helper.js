const axios = require("axios");
const logger = require("signale");

class USHelper {
    constructor(ip, appId, userAgent, buildId) {
        this.ip = ip;
        this.appId = appId;
        this.agent = userAgent;
        this.buildId = buildId;

        this.host = global.config.US.host;
        this.endpoint = "https://" + global.config.US.host;
        this.baseHeaders = {
            "Accept": "*/*",
            "Host": this.host,
            "Ubi-LocaleCode": "en-us",
            "Ubi-Populations": "US_EMPTY_VALUE",
            "Ubi-AppId": this.appId,
            "User-Agent": this.agent,
            "Ubi-AppBuildId": this.buildId,
            "X-Forwarded-For": this.ip
        };
    }

    async getSession(token) {
        try {
            const { data } = await axios({
                method: "POST",
                url: this.endpoint + "/v3/profiles/sessions",
                headers: {
                    ...this.baseHeaders,
                    "Authorization": token
                },
                data: {}
            });
            return data;
        }
        catch(err) {
            console.log(err)
            logger.warn(`Can't fetch session from US: ${err} / ${err.response?.data.message}`);
            return;
        }
    }

    async getUserMe(ticket) {
        try {
            const { data } = await axios({
                method: "GET",
                url: this.endpoint + "/v3/users/me",
                headers: {
                    ...this.baseHeaders,
                    "Authorization": "Ubi_v1 t=" + ticket
                },
                data: {}
            });
            return data;
        }
        catch(err) {
            logger.warn(`Can't fetch user self data from US: ${err} / ${err.response?.data.message}`);
            return;
        }
    }
};

module.exports = USHelper;