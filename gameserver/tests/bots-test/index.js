const { uniqueNamesGenerator, NumberDictionary, animals, colors, names } = require("unique-names-generator");
const Agenda = require("agenda");

const mongoConnectionString = "mongodb://127.0.0.1/agenda";
const agenda = new Agenda({ db: { address: mongoConnectionString } });

const games = require("../../src/config/games");

const countries = require("./countries");
const avatars = require("./avatars");
const { create } = require("agenda/dist/agenda/create");

let BOTS = [];
const VERSION = 2014;
const BOT_AMOUNT = Number(process.argv[2]) || 5;

const MIN_NAME_LENGTH = 4;
const MAX_NAME_LENGTH = 8;
const SEND_SCORE_INTERVAL = 5000;

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomCountry() {
    return countries[Math.floor((Math.random()*countries.length))];
};

function randomAvatar() {
    let result = avatars.filter(a => a.version < VERSION);
    return result[Math.floor((Math.random()*result.length))];
};

function randomName() {
    const nameLength = randomNumber(MIN_NAME_LENGTH, MAX_NAME_LENGTH);
    const numberDictionary = NumberDictionary.generate({ min: 1, max: 50 });
    let config = {
        dictionaries: [animals, numberDictionary, colors, names],
        separator: '',
        length: 1
    };
    // Shuffle array and dictionary length for better random names.
    config.dictionaries = config.dictionaries.sort((a, b) => 0.3 - Math.random());
    config.length = randomNumber(2, config.dictionaries.length);
    return uniqueNamesGenerator(config).slice(0, nameLength);
};

function createBots(amount) {
    let bots = [];
    for (let i = 0; i < amount; i++) {
        const name = randomName().toUpperCase();
        const country = randomCountry().id;
        const avatar = randomAvatar().id;
        let data = {
            name, country, avatar
        };
        bots.push(data);
    }
    return bots;
};

async function updateBotScores(bots) {
    for (let i = 0; i < bots.length; i++) {
        const bot = bots[i];
        
        
    }
};

(async () => {

    BOTS = [...createBots(BOT_AMOUNT)];

    
})();