
const bookSettings = [
    "Ancient Ruins",
    "Dense Rainforest",
    "Desert Oasis",
    "Deep Space",
    "Medieval Castle",
    "Secluded Island",
    "Underground Cave",
    "Arctic Tundra",
    "Post-Apocalyptic Wasteland",
    "Victorian London",
    "Wild West Frontier",
    "Himalayan Mountains",
    "Egyptian Pyramids",
    "Submarine Adventure",
    "19th Century New York",
    "Space Station",
    "Tropical Paradise",
    "Pirate Ship",
    "Dystopian Megacity",
    "Mayan Temple",
    "Lunar Colony",
    "Roaring Twenties Jazz Club",
    "African Savannah",
    "Spacecraft in Deep Space",
    "Arabian Desert",
    "Medieval European Village",
    "Futuristic Cyberpunk City",
    "Native American Reservation",
    "Trans-Siberian Railway",
    "Prehistoric Cave",
    "Australian Outback",
    "Himalayan Monastery",
    "Victorian Manor",
    "Futuristic Spaceport",
    "Ancient Greek Polis",
    "Subterranean World",
    "Inca Ruins",
    "Antarctic Research Station",
    "Renaissance Venice",
    "Space Probe on an Alien Planet",
    "Wild Amazon River",
    "Samurai Dojo",
    "Steampunk Airship",
    "Ancient Chinese Dynasty",
    "Soviet Era Russia",
    "Medieval Dungeon",
    "Underwater City",
    "Aztec Temple",
    "Space Colony on Mars",
    "Victorian Asylum"
];
function getSetting(){
    const ind = Math.floor(Math.random() * (bookSettings.length + 1))
    return bookSettings[ind]
}

function numValidChoices(){
    return Math.floor(Math.random() * (3)+1)
}

module.exports = {
    getSetting,
    numValidChoices
};

