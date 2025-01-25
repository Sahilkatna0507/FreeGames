const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=release-date';
async function slidedata() {
    try {
        const data = await fetchDataFromAPI(url); // Use the reusable function
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
async function fetchGameData(platform, containerSelector) {
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?platform=${platform}&sort-by=release-date`;
    try {
        const data = await fetchDataFromAPI(url); // Reuse the fetch function
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


async function menuData(platform, containerSelector) {
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?platform=${platform}&sort-by=release-date`;
    try {
        const data = await fetchDataFromAPI(url); // Reuse the fetch function
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

document.getElementById("openModal").addEventListener("click", function () {
    document.getElementById("modal").classList.remove("hidden");
  });
  
  // Close Modal on Close Button or Cancel Button Click
  document.querySelectorAll("#closeModal, #closeModalFooter").forEach((btn) => {
    btn.addEventListener("click", function () {
      document.getElementById("modal").classList.add("hidden");
    });
  });
  