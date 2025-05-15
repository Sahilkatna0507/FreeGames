function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
async function gameIdData() {
        const gameid = getQueryParam('id') || ""; 
        const aurl = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameid}`;
        try {
            const data = await fetchDataFromAPI(aurl); 
            const title= data.title;
            const short_description= data.short_description;
            const description= data.description;
            const thumbnail = data.thumbnail;
            const t = document.getElementById("title");
            const s = document.getElementById("short_description");
            const d = document.getElementById("description");
            const img = document.getElementById("thumbnail");
            d.innerHTML = description;
            t.innerHTML= title;
            s.innerHTML =short_description;
            img.src = thumbnail;
        }
        catch (error) {
            console.error('Error during swiper initialization:', error);
        }
} 
gameIdData();