const API_KEY = '33eb98db299f1dd7ddd3a6801e9960bc'; 
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const movieContainer = document.getElementById('movie-container');
const searchInput = document.getElementById('search');

async function getMovies(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayMovies(data.results);
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

function displayMovies(movies) {
    movieContainer.innerHTML = '';
    movies.forEach(movie => {
        const { title, poster_path, id } = movie;
        if (!poster_path) return;

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}" onclick="getTrailer(${id})">
            <h3>${title}</h3>
            <button onclick="downloadMovie('${title}')">Download</button>
        `;
        movieContainer.appendChild(movieEl);
    });
}

async function getTrailer(movieId) {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`);
    const data = await res.json();

    if (data.results.length > 0) {
        const trailerKey = data.results[0].key;
        document.getElementById('trailer-frame').src = `https://www.youtube.com/embed/${trailerKey}`;
        document.getElementById('trailer-modal').style.display = 'block';
    }
}

function closeTrailer() {
    document.getElementById('trailer-modal').style.display = 'none';
    document.getElementById('trailer-frame').src = '';
}

function downloadMovie(title) {
    const sanitizedTitle = title.replace(/[^a-zA-Z0-9]/g, '_');
    const downloadURL = `https://yourwebsite.com/movies/${sanitizedTitle}.mp4`;

    const a = document.createElement('a');
    a.href = downloadURL;
    a.download = `${sanitizedTitle}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.trim();
    if (searchTerm) {
        getMovies(SEARCH_API + searchTerm);
    } else {
        getMovies(API_URL);
    }
});

getMovies(API_URL);
