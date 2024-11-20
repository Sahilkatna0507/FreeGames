console.log("re");
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
                // console.log(platform.platform); 
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
            else if(!gameYear[yeardata]){
                gameYear[yeardata] = true;
                const test=  yeardata;
                const year = document.createElement('option');
                year.value = test;
                year.textContent = test;
                gameyear.appendChild(year); 
            }
        });
    }
    catch (error) {
        console.error('Error during swiper initialization:', error);
    }
}
gameplatform();