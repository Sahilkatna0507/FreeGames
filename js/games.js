function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

async function fetchFilteredGames() {
    const platform = getQueryParam('platform') || "";
    const category = getQueryParam('category') || "";
    const year = getQueryParam('years') || "";
    const sortby = getQueryParam('sort') || "";
    console.log(platform, category, year, sortby);
    try {
        const url = `https://free-to-play-games-database.p.rapidapi.com/api/games`;
        const data = await fetchDataFromAPI(url);

        const itemsPerPage = 12;
        const filteredData = data.filter(game => 
            (platform === "" || game.platform.toLowerCase().includes(platform.toLowerCase())) &&
            (category === "" || game.genre.toLowerCase().includes(category.toLowerCase())) &&
            (year === "" || new Date(game.release_date).getFullYear() == year)
        );
        const sortedData = filteredData.sort((a, b) => {
            if (sortby === "a-z") {
                return a.title.localeCompare(b.title); // Alphabetical order
            } else if (sortby === "z-a") {
                return b.title.localeCompare(a.title); // Reverse alphabetical order
            } else if (sortby === "new") {
                return new Date(b.release_date) - new Date(a.release_date); // Newest first
            } else if (sortby === "oldest") {
                return new Date(a.release_date) - new Date(b.release_date); // Oldest first
            }
            return 0;
        });
        const totalItems = sortedData.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        function getCurrentPage() {
            const hash = window.location.hash.slice(1);
            const page = parseInt(hash) || 1;
            return Math.min(Math.max(page, 1), totalPages);
      }
        function displayCards(currentPage) {
            const gamecard = document.querySelector('.game-card');
            gamecard.innerHTML = "";
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            sortedData.slice(startIndex, endIndex).forEach(game => {
                const card = document.createElement('div');
                card.className = 'bg-gray-800 border border-gray-600 rounded-lg p-4';
                card.innerHTML = `
                    <a href="game-details.html?id=${game.id}">
                        <img src="${game.thumbnail}" alt="Game Image">
                        <h2 class="text-xl font-semibold text-white">${game.title}</h2>
                        <p class="text-gray-400 mt-2">${game.genre}</p>
                        <p>${game.platform}</p>
                        <p>${game.release_date}</p>
                    </a>`;
                gamecard.appendChild(card);
            });
        }
        function createPaginationControls(currentPage) {
            const paginationContainer = document.querySelector('.pagination-controls');
            paginationContainer.innerHTML = "";

            if (currentPage > 1) {
                const prevButton = document.createElement('a');
                prevButton.href = `#${currentPage - 1}`;
                prevButton.textContent = "<";
                prevButton.className = "px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600";
                paginationContainer.appendChild(prevButton);
            }
            const maxVisibleButtons = 5; // Number of visible page buttons
            const startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
            const endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);
            if (startPage > 1) {
                const firstPage = document.createElement('a');
                firstPage.href = "#1";
                firstPage.textContent = "1";
                firstPage.className = "px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600";
                paginationContainer.appendChild(firstPage);

                if (startPage > 2) {
                    const dots = document.createElement('span');
                    dots.textContent = "...";
                    dots.className = "px-4 py-2 text-gray-400";
                    paginationContainer.appendChild(dots);
                }
            }
            for (let i = startPage; i <= endPage; i++) {
                const pageLink = document.createElement('a');
                pageLink.href = `#${i}`;
                pageLink.textContent = i;
                pageLink.className = `px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 ${i === currentPage ? 'bg-gray-600' : ''}`;
                paginationContainer.appendChild(pageLink);
            }
            if (endPage < totalPages) {
                if (endPage < totalPages - 1) {
                    const dots = document.createElement('span');
                    dots.textContent = "...";
                    dots.className = "px-4 py-2 text-gray-400";
                    paginationContainer.appendChild(dots);
                }
                const lastPage = document.createElement('a');
                lastPage.href = `#${totalPages}`;
                lastPage.textContent = totalPages;
                lastPage.className = "px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600";
                paginationContainer.appendChild(lastPage);
            }
            if (currentPage < totalPages) {
                const nextButton = document.createElement('a');
                nextButton.href = `#${currentPage + 1}`;
                nextButton.textContent = ">";
                nextButton.className = "px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600";
                paginationContainer.appendChild(nextButton);
            }
        }
        function handleHashChange() {
            const currentPage = getCurrentPage();
            displayCards(currentPage);
            createPaginationControls(currentPage);
        }
        window.addEventListener('hashchange', handleHashChange);
        handleHashChange();
    } catch {
        console.log('Error fetching data');
    }
}

fetchFilteredGames();
