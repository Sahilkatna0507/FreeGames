
async function fetchDataFromAPI(url) {
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'ddc77ba17dmsh9757b4165dd8a04p179b34jsndb3e9fbbea77',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
