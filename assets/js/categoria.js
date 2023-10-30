const apiKey = 'c6c380f82908eab9870589641a012358';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const mainfav = document.getElementById('main-fav');
const main = document.getElementById('main');
const mainSearch = document.getElementById('main-search');
let page = 1

async function fetchMoviesByCategory() {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${idCategoria}&language=pt-BR&page=${page}`);
    const data = await response.json();
    showMovies(data.results);
}
const pageH4 = document.querySelector('.page')
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
        ${overview}<br>
        <button id="${movie.id}" class="btn-movie">Mais detalhes</button>
        </div>
     
        `;
        const btnmovie = movieEl.querySelector('.btn-movie')
        movieList.appendChild(movieEl)
        main.appendChild(movieList);

        btnmovie.addEventListener('click',()=>{
            console.log(title)
        })

       
    });
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
            fetchMoviesByCategory()
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
        fetchMoviesByCategory()
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
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}


fetchMoviesByCategory();
