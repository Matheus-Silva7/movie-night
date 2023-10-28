const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const apiKey = 'c6c380f82908eab9870589641a012358';
const mainfav = document.getElementById('main-fav');
const main = document.getElementById('main');
const mainSearch = document.getElementById('main-search');
let page = 1
const API_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=c6c380f82908eab9870589641a012358&language=pt-BR&page=${page}`

getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}
const pageH4 = document.querySelector('.page')
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
    )
    main.innerHTML += `
    <div class = "btnpage">
    <button class="btn-prev">prev</button>
    <p>${page}</p>
    <button class="btn-next">next</button>
    </div>
    `
    const btnNext = document.querySelector('.btn-next')
    const btnprev = document.querySelector('.btn-prev')
    pageH4.textContent = `Página: ${page}`
    btnprev.addEventListener('click', () => {
        if (page > 1) {
            page--
            const prevPageURL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&language=pt-BR&page=${page}`;
            getMovies(prevPageURL)
            //rola a pagina para o inicio
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
            pageH4.textContent = `Página: ${page}`
        }
    })

    btnNext.addEventListener('click', () => {
        page++
        const nextPageURL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&language=pt-BR&page=${page}`;
        getMovies(nextPageURL);
        //rola a pagina para o inicio
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        pageH4.textContent = `Página: ${page}`
    })
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

