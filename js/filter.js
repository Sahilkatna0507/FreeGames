async function gameplatform() {
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/games`;
    try {
        const data = await fetchDataFromAPI(url);
        const gamecard = document.querySelector('#platform');
        const gamecat = document.querySelector('#category_filter');
        const gameyear = document.querySelector('#release_year');
        const  gamePlatform ={};
        const genreSet = new Set();  
        const gameYear ={};
        data.forEach(platform => {   
            const plat =platform.platform;
            const genre =platform.genre;
            const date=new Date(platform.release_date);
            const yeardata = date.getFullYear();
            if(!gamePlatform[plat]){
                const platform = document.createElement('option');
                gamePlatform[plat] = true;
                platform.value = plat;
                platform.textContent = plat;
                gamecard.appendChild(platform);         
            }
            else if(!genreSet .has(genre)){
                genreSet.add(genre);
                const cat = document.createElement('option');
                cat.value = genre;
                cat.textContent = genre;
                gamecat.appendChild(cat); 
            }
            else if (!gameYear[yeardata]) {
                gameYear[yeardata] = true;
                const year = document.createElement('option');
                const test= yeardata;
                year.value = yeardata; 
                year.textContent = yeardata;
                gameyear.appendChild(year);
            }
        });
    document.addEventListener('change', (event) => {
        const targetId = event.target.id; // Get the ID of the dropdown that triggered the event
        const selectedValue = event.target.value; // Get the selected value
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        switch (targetId) {
            case 'platform': 
                if (selectedValue.toLowerCase().includes("web")) {
                    params.set('platform', 'browser');
                } else {
                    params.set('platform', 'pc');
                }
                break;
            case 'category_filter': 
                params.set('category', selectedValue);
                break;
            case 'release_year':
                params.set('years', selectedValue);
                break;
            case 'sort_by': 
                params.set('sort', selectedValue);
                break;
        }
        window.location.href = `games.html?${params.toString()}`;   
});
    } catch (error) {
        console.error('Error during initialization:', error);
    }
}
gameplatform();