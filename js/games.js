function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

async function fetchFilteredGames() {
    // Get platform and category from URL parameters
    const platform = getQueryParam('platform') || ""; // Default to 'pc' if not specified
    const category = getQueryParam('category') || "";
    try{
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/games`;
        const data = await fetchDataFromAPI(url);
        //use direct fiter and avoid loop
        // let filteredStrings = data.filter(game => game.platform.toLowerCase().includes(platform.toLowerCase()));
        // console.log(filteredStrings);
        const gamecard = document.querySelector('.game-card');
        data.forEach(game => {
            if (
                (platform === "" || game.platform.toLowerCase().includes(platform.toLowerCase())) &&
                (category === "" || game.genre.toLowerCase().includes(category.toLowerCase()))
            )    {
             const card = document.createElement('div');
             card.className = 'bg-gray-800 border border-gray-600 rounded-lg p-4 ';
                card.innerHTML = `
                <a href="game-details.html?id=${game.id}">
                    <img src="${game.thumbnail}" alt="Game Image">
                        <h2 class="text-xl font-semibold text-white">${game.title}</h2>
                        <p class="text-gray-400 mt-2">${game.genre}</p>
                        <p>${game.platform}</p>
                        <p>${game.release_date}</p>
                </a>
                `;
            gamecard.appendChild(card);
             }
        }); 
    }
    catch {
        console.log('Error fetching data');
    }
}
fetchFilteredGames();


