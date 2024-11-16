// console.log("rfearr");
// async function pcgames(){
//     const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games?platform=pc&sort-by=release-date';
// try{
//     console.log("game");
//     const data = await fetchDataFromAPI(url);
//     data.forEach(game => {
//         console.log(game);
//     }); 
// }
// catch {
//     console.log('Error fetching data');
// }
// }

// async function browgames(){
//     const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games?platform=pc&sort-by=release-date';
// try{
//     console.log("game");
//     const data = await fetchDataFromAPI(url);
//     data.forEach(game => {
//         console.log(game);
//     }); 
// }
// catch {
//     console.log('Error fetching data');
// }
// }
// Function to get query parameters from URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Main function to fetch games based on platform and category from URL
async function fetchFilteredGames() {
    // Get platform and category from URL parameters
    const platform = getQueryParam('platform') || 'pc'; // Default to 'pc' if not specified
    const category = getQueryParam('category') || "shooter";
    console.log(platform);
    console.log(category);
    try{
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?platform=${platform}&category=${category}`;
        const data = await fetchDataFromAPI(url);
        data.forEach(game => {
            console.log(game);
        }); 
    }
    catch {
        console.log('Error fetching data');
    }
}

// Call the function to fetch filtered games
fetchFilteredGames();


