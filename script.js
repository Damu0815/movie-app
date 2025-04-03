const API_KEY = '33eb98db299f1dd7ddd3a6801e9960bc'; 
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const movieContainer = document.getElementById('movie-container');
const searchInput = document.getElementById('search');

async function getMovies(pageCount = 10) {  // Fetching 10 pages (200 movies)
    movieContainer.innerHTML = ''; // Clear previous results

    let movies = [];
    for (let page = 1; page <= pageCount; page++) {
        try {
            const res = await fetch(`${API_URL}&page=${page}`);
            const data = await res.json();
            movies = [...movies, ...data.results];
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    }
    displayMovies(movies);
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

// Fetch 200 movies by default
getMovies(10);
