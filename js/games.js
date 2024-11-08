console.log("rfearr");
async function pcgames(){
    const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games?platform=pc&sort-by=release-date';
try{
    console.log("game");
    const data = await fetchDataFromAPI(url);
    data.forEach(game => {
        console.log(game);
    }); 
}
catch {
    console.log('Error fetching data');
}
}

