const API_URL = 'https://api.themoviedb.org/3/trending/movie/week?api_key=c6c380f82908eab9870589641a012358&language=pt-BR&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'

const main = document.getElementById('main')

getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = ''
    const movieList = document.createElement('div')
    movieList.classList.add('movieList')
    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

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
        `
        movieList.appendChild(movieEl)
        main.appendChild(movieList);
      }
    )}
    /* main.innerHTML += `<button>aaaa mais</button>` */

function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

