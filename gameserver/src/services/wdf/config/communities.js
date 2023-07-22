const locs = {
    Boys: {
        en: "Boys",
        fr: "Garçons",
        de: "Jungs",
        it: "Maschi",
        es: "Chicos",
        nl: "Jongens",
        pt: "Garotos",
        fi: "Pojat",
        no: "Gutter",
        sv: "Killar",
        da: "Drenge"
    },
    Girls: {
        en: "Girls",
        fr: "Filles",
        de: "Mädchen",
        it: "Femmine",
        es: "Chicas",
        nl: "Meisjes",
        pt: "Garotas",
        fi: "Tytöt",
        no: "Jenter",
        sv: "Tjejer",
        da: "Piger"
    },
    Rock: {
        en: "Rock",
        fr: "Rock",
        de: "Rock",
        it: "Rock",
        es: "Rock",
        nl: "Rock",
        pt: "Rock",
        fi: "Rock",
        no: "Rock",
        sv: "Rock",
        da: "Rock"
    },
    Pop: {
        en: "Pop",
        fr: "Pop",
        de: "Pop",
        it: "Pop",
        es: "Pop",
        nl: "Pop",
        pt: "Pop",
        fi: "Pop",
        no: "Pop",
        sv: "Pop",
        da: "Pop"
    },
    Beauty: {
        en: "Beauty",
        fr: "La Belle",
        de: "Schönheit",
        it: "Bella",
        es: "Bella",
        nl: "Beauty",
        pt: "Bela",
        fi: "Kaunotar",
        no: "Skjønnhet",
        sv: "Skönhet",
        da: "Skønheden"
    },
    Beast: {
        en: "Beast",
        fr: "La bête",
        de: "Biest",
        it: "Bestia",
        es: "Bestia",
        nl: "Beest",
        pt: "Fera",
        fi: "Hirviö",
        no: "Udyr",
        sv: "Odjur",
        da: "Udyret"
    },
    Rayman: {
        en: "Rayman",
        fr: "Rayman",
        de: "Rayman",
        it: "Rayman",
        es: "Rayman",
        nl: "Rayman",
        pt: "Rayman",
        fi: "Rayman",
        no: "Rayman",
        sv: "Rayman",
        da: "Rayman"
    },
    Rabbits: {
        en: "Raving Rabbids",
        fr: "Lapins crétins",
        de: "Raving Rabbids",
        it: "Raving Rabbids",
        es: "Raving Rabbids",
        nl: "Raving Rabbids",
        pt: "Raving Rabbids",
        fi: "Raving Rabbids",
        no: "Raving Rabbids",
        sv: "Raving Rabbids",
        da: "Raving Rabbids"
    },
    Robots: {
        en: "Robots",
        fr: "Robots",
        de: "Roboter",
        it: "Robot",
        es: "Robots",
        nl: "Robots",
        pt: "Robôs",
        fi: "Robotit",
        no: "Roboter",
        sv: "Robotar",
        da: "Robotter"
    },
    Aliens: {
        en: "Aliens",
        fr: "Extraterrestres",
        de: "Aliens",
        it: "Alieni",
        es: "Alienígenas",
        nl: "Aliens",
        pt: "Alienígenas",
        fi: "Avaruusolennot",
        no: "Romvesen",
        sv: "Utomjordingar",
        da: "Rumvæsner"
    },
    Dad: { en: "Dad", fr: "Papa" },
    Mom: { en: "Mom", fr: "Maman" },
    Brother: { en: "Brother", fr: "Frère" },
    Sister: { en: "Sister", fr: "Soeur" },
    Dog: {
        en: "Dog",
        fr: "Chien",
        de: "Hund",
        it: "Cane",
        es: "Perro",
        nl: "Hond",
        pt: "Cachorro",
        fi: "Koira",
        no: "Hund",
        sv: "Hund",
        da: "Hund"
    },
    Cat: {
        en: "Cat",
        fr: "Chat",
        de: "Katze",
        it: "Gatto",
        es: "Gato",
        nl: "Kat",
        pt: "Gato",
        fi: "Kissa",
        no: "Katt",
        sv: "Katt",
        da: "Kat"
    },
    Sun: {
        en: "Sun",
        fr: "Soleil",
        de: "Sonne",
        it: "Sole",
        es: "Sol",
        nl: "Zon",
        pt: "Sol",
        fi: "Aurinko",
        no: "Sol",
        sv: "Sol",
        da: "Sol"
    },
    Moon: {
        en: "Moon",
        fr: "Lune",
        de: "Mond",
        it: "Luna",
        es: "Luna",
        nl: "Maan",
        pt: "Lua",
        fi: "Kuu",
        no: "Måne",
        sv: "Måne",
        da: "Måne"
    },
    Day: {
        en: "Day",
        fr: "Jour",
        de: "Tag",
        it: "Giorno",
        es: "Día",
        nl: "Dag",
        pt: "Dia",
        fi: "Päivä",
        no: "Dag",
        sv: "Dag",
        da: "Dag"
    },
    Night: {
        en: "Night",
        fr: "Nuit",
        de: "Nacht",
        it: "Notte",
        es: "Noche",
        nl: "Nacht",
        pt: "Noite",
        fi: "Yö",
        no: "Natt",
        sv: "Natt",
        da: "Nat"
    },
    Love: {
        en: "Love",
        fr: "Amour",
        de: "Liebe",
        it: "Amore",
        es: "Amor",
        nl: "Liefde",
        pt: "Amor",
        fi: "Rakkaus",
        no: "Kjærlighet",
        sv: "Kärlek",
        da: "Kærlighed"
    },
    War: {
        en: "War",
        fr: "Guerre",
        de: "Krieg",
        it: "Guerra",
        es: "Guerra",
        nl: "Oorlog",
        pt: "Guerra",
        fi: "Sota",
        no: "Krig",
        sv: "Krig",
        da: "Krig"
    },
    Young: {
        en: "Young",
        fr: "Jeunes",
        de: "Jung",
        it: "Giovani",
        es: "Juventud",
        nl: "Jong",
        pt: "Jovem",
        fi: "Nuori",
        no: "Ung",
        sv: "Ung",
        da: "Ung"
    },
    Old: {
        en: "Old",
        fr: "Vieux",
        de: "Alt",
        it: "Vecchi",
        es: "Vejez",
        nl: "Oud",
        pt: "Velho",
        fi: "Vanha",
        no: "Gammel",
        sv: "Gammal",
        da: "Gammel"
    },
    North: {
        en: "North",
        fr: "Nord",
        de: "Norden",
        it: "Nord",
        es: "Norte",
        nl: "Noord",
        pt: "Norte",
        fi: "Pohjoinen",
        no: "Nord",
        sv: "Nord",
        da: "Nord"
    },
    South: {
        en: "South",
        fr: "Sud",
        de: "Süden",
        it: "Sud",
        es: "Sur",
        nl: "Zuid",
        pt: "Sul",
        fi: "Etelä",
        no: "Sør",
        sv: "Syd",
        da: "Syd"
    },
    West: {
        en: "West",
        fr: "Ouest",
        de: "Westen",
        it: "Ovest",
        es: "Oeste",
        nl: "West",
        pt: "Oeste",
        fi: "Länsi",
        no: "Vest",
        sv: "Väst",
        da: "Vest"
    },
    East: {
        en: "East",
        fr: "Est",
        de: "Osten",
        it: "Est",
        es: "Este",
        nl: "Oost",
        pt: "Leste",
        fi: "Itä",
        no: "Øst",
        sv: "Öst",
        da: "Øst"
    },
    Fire: {
        en: "Fire",
        fr: "Feu",
        de: "Feuer",
        it: "Fuoco",
        es: "Fuego",
        nl: "Vuur",
        pt: "Fogo",
        fi: "Tuli",
        no: "Ild",
        sv: "Eld",
        da: "Ild"
    },
    Ice: {
        en: "Ice",
        fr: "Glace",
        de: "Eis",
        it: "Ghiaccio",
        es: "Hielo",
        nl: "IJs",
        pt: "Gelo",
        fi: "Jää",
        no: "Is",
        sv: "Is",
        da: "Is"
    },
    Earth: {
        en: "Earth",
        fr: "Terre",
        de: "Erde",
        it: "Terra",
        es: "Tierra",
        nl: "Aarde",
        pt: "Terra",
        fi: "Maa",
        no: "Jord",
        sv: "Jord",
        da: "Jord"
    },
    Wind: {
        en: "Wind",
        fr: "Vent",
        de: "Wind",
        it: "Vento",
        es: "Viento",
        nl: "Wind",
        pt: "Vento",
        fi: "Tuuli",
        no: "Vind",
        sv: "Vind",
        da: "Vind"
    },
    Princess: {
        en: "Princess",
        fr: "Princesse",
        de: "Prinzessin",
        it: "Principessa",
        es: "Princesa",
        nl: "Prinses",
        pt: "Princesa",
        fi: "Prinsessa",
        no: "Prinsesse",
        sv: "Prinsessa",
        da: "Prinsesse"
    },
    Knight: {
        en: "Knight",
        fr: "Chevalier",
        de: "Ritter",
        it: "Cavaliere",
        es: "Caballero",
        nl: "Ridder",
        pt: "Cavalheiro",
        fi: "Ritari",
        no: "Ridder",
        sv: "Riddare",
        da: "Ridder"
    },
    WiiLink: {
        en: "WiiLink"
    },
    RiiConnect24: {
        en: "RiiConnect24"
    },
    Top: {
        en: "Top"
    },
    Bottom: {
        en: "Bottom"
    },
    Jennie: {
        en: "Jennie"
    },
    Lisa: {
        en: "Lisa"
    },
    JDU: {
        en: "JDU"
    },
    JDP: {
        en: "JD+"
    },
    Chaos: {
        en: "Chaos"
    },
    Order: {
        en: "Order"
    },
    Cardi: {
        en: "Cardi B"
    },
    Nicki: {
        en: "Nicki Minaj"
    },
    Rama: {
        en: "Rama"
    },
    Devd: {
        en: "devd"
    },
    Love: {
        en: "Love"
    },
    Hate: {
        en: "Hate"
    },
    IVE: {
        en: "IVE"
    },
    LSR: {
        en: "LESSERAFIM"
    },
    Kebab: {
        en: "Kebab"
    },
    Delight: {
        en: "Turkish Delight"
    },
    Eighties: {
        en: "1980s"
    },
    TwentyTens: {
        en: "2010s"
    },
};

const list = [
    [locs.Boys, locs.Girls],
    [locs.Rock, locs.Pop],
    [locs.Beauty, locs.Beast],
    [locs.Rayman, locs.Rabbits],
    [locs.Robots, locs.Aliens],
    [locs.Dad, locs.Mom],
    [locs.Brother, locs.Sister],
    [locs.Dog, locs.Cat],
    [locs.Sun, locs.Moon],
    [locs.Day, locs.Night],
    [locs.Love, locs.War],
    [locs.Young, locs.Old],
    [locs.North, locs.South],
    [locs.West, locs.East],
    [locs.Fire, locs.Ice],
    [locs.Earth, locs.Wind],
    [locs.Princess, locs.Knight],
    [locs.Jennie, locs.Lisa],
    [locs.Chaos, locs.Order],
    [locs.Cardi, locs.Nicki],
    [locs.Love, locs.Hate],
    [locs.IVE, locs.LSR],
    [locs.Kebab, locs.Delight],
    [locs.Eighties, locs.TwentyTens],
    //[locs.RiiConnect24, locs.WiiLink],
    //[locs.Top, locs.Bottom],
    //[locs.JDU, locs.JDP],
    // [locs.Rama, locs.Devd]
];

module.exports = {
    list, locs
};