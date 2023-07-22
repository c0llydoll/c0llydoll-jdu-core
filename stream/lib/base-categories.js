const contentManager = require("./content-manager");

async function gameCategories(songs = []) {
    const carouselOrder = await contentManager.fetchCarouselOrder();
    return carouselOrder.map(g => {
        return {
            name: g.title,
            songs: songs.filter(s => s.originalJDVersion == g.version)
        }
    });
};

module.exports = async (songs) => [

    {
        name: "DanceParty Stream",
        songs
    },
    {
        name: "Solo",
        songs: songs.filter(s => s.coachCount == 1)
    },
    {
        name: "Duet",
        songs: songs.filter(s => s.coachCount == 2)
    },
    {
        name: "Trio",
        songs: songs.filter(s => s.coachCount == 3)
    },
    {
        name: "Dance Crew",
        songs: songs.filter(s => s.coachCount == 4)
    },
    ...await gameCategories(songs)

];