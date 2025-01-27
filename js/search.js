

// Input query ke basis par games ko filter karna
function handleSearch(games, query) {
return games.filter(game => {
  const titleMatch = game.title.toLowerCase().includes(query); // Title me match check karna
  const genreMatch = game.genre.toLowerCase().includes(query); // Genre me match check karna
  const platformMatch = game.platform.toLowerCase().includes(query); // Platform me match check karna
  return titleMatch || genreMatch || platformMatch; // Agar koi bhi match ho to return karna
});
}

// Filtered results ko render karne ke liye function
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

if (gamesData.length === 0) { // Agar games data load na hua ho
  gamesData = await fetchGames(); // API se games ko fetch karna
}

const filteredGames = handleSearch(gamesData, query); // Filtered results ko fetch karna
renderResults(filteredGames); // Filtered results ko render karna
});