/**
 * Server configuration
 */

module.exports.ENVS = [
    "local", "dev", "uat", "prod", "test", "qc"
];
module.exports.DEFAULT_LANGUAGE = "en";

// Skus that should have their songDB fetched from CDN
module.exports.CDN_SONGDB_SKUS = [
    "jd2019", "jd2020", "jd2021", "jd2022"
];

module.exports.HEADER_SKUID = "x-skuid";
module.exports.SONGDB_DURATION = (1 * 3600); // 1 hour

// Amount of days for a song item in carousel to have the "NEW" tag
module.exports.CAROUSEL_NEW_TAG_DURATION = (1000*60*60*24) * 7; // 7 days

module.exports.MAX_SCORE = 13333;
module.exports.MAX_LEADERBOARD_AMOUNT = 5;

module.exports.UBISERVICES_TICKET_OPTIONS = {
    "HEADER_AUTHORIZATION": "Ubi_v1"
};

module.exports.VP9_PLATFORMS = ["nx"];
module.exports.HD_PLATFORMS = ["ps4"];

module.exports.DEFAULT_TAGS = ["Main"];
module.exports.DEFAULT_CREDITS = "All rights of the producer and other rightholders to the recorded work reserved. Unless otherwise authorized, the duplication, rental, loan, exchange or use of this video game for public performance, broadcasting and online distribution to the public are prohibited.";