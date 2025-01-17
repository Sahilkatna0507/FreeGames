async function gameplatform() {
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/games`;
    try {
        const data = await fetchDataFromAPI(url);
        // console.log(data);
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
                year.value = yeardata; 
                year.textContent = yeardata;
                gameyear.appendChild(year);
            }
            gamecard.addEventListener('change', (event) => {
                const selectedPlatform = event.target.value;
                console.log("Raw selectedPlatform:", selectedPlatform); // Debugging log
                console.log(selectedPlatform.toLowerCase());
                const url = new URL(window.location.href);
                const params = new URLSearchParams(url.search);
                if (selectedPlatform.toLowerCase().includes("web")) {
                    params.set('platform', 'browser');
                } else {
                    params.set('platform', selectedPlatform);
                } 
                window.location.href = `games.html?${params.toString()}`;
            });
            gamecat.addEventListener('change', (event) => {
                const selectedCat = event.target.value;
                
                const url = new URL(window.location.href);
                const params = new URLSearchParams(url.search);
                params.set('category', selectedCat);
                window.location.href = `games.html?${params.toString()}`;
            });
            gameyear.addEventListener('change', (event) => {
                const selectedYear = event.target.value;
                // console.log("Raw selectedYear:", selectedYear); // Debugging log
                const url = new URL(window.location.href);
                const params = new URLSearchParams(url.search);
                params.set('years', selectedYear);
                window.location.href = `games.html?${params.toString()}`;
            });
        });
    }
    catch (error) {
        console.error('Error during swiper initialization:', error);
    }
}
gameplatform();