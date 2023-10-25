const API_KEY = 'c6c380f82908eab9870589641a012358';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const main = document.getElementById('main');
let page = 1

/* const btnMore = document.querySelector('.btn-more')

btnMore.addEventListener('click', ()=>{
    page ++
    fetchMoviesByCategory()
})  */

async function fetchMoviesByCategory() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${idCategoria}&language=pt-BR&page=${page}`);
        const data = await response.json();
        showMovies(data.results);
    } catch (error) {
        console.error(error);
    }
}

function showMovies(movies) {
    main.innerHTML = '';
    const movieList = document.createElement('div')
    movieList.classList.add('movieList')
    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${parseFloat(vote_average).toFixed(1)}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `;
        movieList.appendChild(movieEl)
        main.appendChild(movieList);
    });
    main.innerHTML += `<button class="btn-more">aaaa mais</button>`
}


function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}


fetchMoviesByCategory();
