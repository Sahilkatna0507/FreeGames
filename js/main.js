
async function main() {

const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=release-date';
const data =  await fetchDataFromAPI(url);
function slidedata() {
    try {
        const swiperWrapper = document.querySelector('.swiper-wrapper');
        swiperWrapper.innerHTML = '';
        let count = 0;
        data.forEach(game => {
            if (count < 10) { 
                const slide = document.createElement('div');
                slide.className = 'swiper-slide';
                slide.innerHTML = `
                  <a href="game-details.html?id=${game.id}" class="block">
                    <div class="bg-gray-800 rounded-lg p-4 text-white">
                        <p class="text-blue-400">${game.platform}</p>
                        <p class="mb-2">${game.genre}</p>
                        <h5 class="text-xl font-bold">${game.title}</h5>
                        <img src="${game.thumbnail}" alt="${game.title}" class="rounded mt-3">
                    </div>
                    </a>
                `;
                swiperWrapper.appendChild(slide);
                count++;
            }
        });
        const swiper = new Swiper('.swiper', {
            effect: 'coverflow',
            slidesPerView: 1,
            spaceBetween: 10,
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
        });
    } catch (error) {
        console.error('Error during swiper initialization:', error);
    }
}
function fetchGameData(platform, containerSelector) {
    try {
        const container = document.querySelector(containerSelector); // Container based on platform
        data.forEach(game => {
            const marque = document.createElement('div');
            marque.className = 'card w-1/4 h-80 relative overflow-hidden rounded-lg shadow-lg flex-shrink-0 mr';     
            marque.innerHTML = `
              <a href="game-details.html?id=${game.id}" class="block">
                <img src="${game.thumbnail}" alt="Game Image" class="card-image w-full h-full object-cover">
                <div class="card-content absolute inset-0 flex flex-col justify-center items-center text-white bg-black bg-opacity-50 opacity-0 transition duration-500">
                    <h3 class="text-xl font-bold mb-2">${game.title}</h3>
                    <p>${game.genre}</p>
                    <p>${game.platform}</p>
                    <p>${game.release_date}</p>
                </div>
              </a>
            `;
            container.appendChild(marque);
        });
    } catch (error) {
        console.error(`Error fetching data for platform ${platform}:`, error);
    }
}

// Function calls for browser and PC
fetchGameData('browser', '.scrolling-wrapper'); // For browser games
fetchGameData('pc', '.scrolling-pc'); // For PC games


 function menuData(platform, containerSelector) {
    try {
        const swiperPC = document.querySelector(containerSelector);
        const genreMap = {};  
        data.forEach(game => {     
            const genre = game.genre.toLowerCase(); 
            if (!genreMap[genre]) {
                const pcButton = document.createElement('li');
                pcButton.className = 'block px-4 py-2 hover:bg-gray-100';    
                pcButton.innerHTML = `
                    <a href="games.html?platform=${platform}&category=${encodeURIComponent(genre)}" 
                       class="block px-4 py-2 hover:bg-gray-100">
                       ${game.genre}
                    </a>`;
                swiperPC.appendChild(pcButton);
                genreMap[genre] = true;
            }
        });
    } catch (error) {
        console.error("Error fetching data or generating menu items:", error);
    }   
}
menuData('pc' ,'.pcmenu');
menuData( 'browser','.browsermenu');
slidedata();


//search fnctionality

const openModalBtn = document.getElementById('openModalBtn'); 
const closeModalBtn = document.getElementById('closeModalBtn'); 
const searchModal = document.getElementById('searchModal'); 
const searchInput = document.getElementById('searchInput'); 
const resultsContainer = document.getElementById('resultsContainer'); 

openModalBtn.addEventListener('click', () => {
searchModal.style.display = 'flex'; 
});

closeModalBtn.addEventListener('click', () => {
    searchModal.style.display = 'none'; 
    searchInput.value = ''; 
});

let gamesData = []; 
searchInput.addEventListener('input', async (e) => {
const query = e.target.value.trim().toLowerCase();

if (query.length < 1) { 
  resultsContainer.innerHTML = '<p style="text-align: center; color: #555;">Type at least 2 characters to search.</p>'; // Default message show karna
  return;
}

if (gamesData.length === 0) { // Agar games data load na hua ho
    gamesData =data; // API se games ko fetch karna
  }
  const filteredGames = handleSearch(gamesData, query);
  const abc =filteredGames.sort((a, b) => {
        return a.title.localeCompare(b.title);
  });
  renderResults(abc); 
});
  function handleSearch(games, query) {
    return games.filter(game => {
      const titleMatch = game.title.toLowerCase().includes(query); // Title me match check karna
      const genreMatch = game.genre.toLowerCase().includes(query); // Genre me match check karna
      const platformMatch = game.platform.toLowerCase().includes(query); // Platform me match check karna
      return titleMatch || genreMatch || platformMatch; // Agar koi bhi match ho to return karna
    });
}
function renderResults(games) {
    if (games.length === 0) { // Agar koi result na ho
      resultsContainer.innerHTML = '<p style="text-align: center; color: #555;">No results found.</p>'; // No result message show karna
      return;
    } 
    resultsContainer.innerHTML = ''; // Pehle se existing content ko clear karna
    games.forEach(game => { // Har ek game ke liye
      const gameItem = document.createElement('div'); // Ek naya div create karna
      gameItem.className = 'game-item'; // Class set karna
      gameItem.innerHTML = `
        <img src="${game.thumbnail}" alt="${game.title}">
        <div class="info">
          <h4>${game.title}</h4>
          <p>${game.genre}, ${game.platform}</p>
        </div>
      `; // Game ke details HTML me add karna
      resultsContainer.appendChild(gameItem); // Result container me add karna
    });
    }
}


main();