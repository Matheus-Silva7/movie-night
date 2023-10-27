

//chamando classes das categorias para adicionar os posters
const releasesMovies = document.querySelector('.releases-movies');
const ratedMovies = document.querySelector('.rated-movies');
const ratedSeries = document.querySelector('.rated-series');
const series = document.querySelector('.series');

const descList = [];

// Função para criar cartões de filmes e adicionar eventos de clique
function createCard(movie, container) {
    const imgMovie = document.createElement('div');
    imgMovie.classList.add("movie-image");
    imgMovie.innerHTML = `
        <button id="${movie.id}" class="btn-movie" href="">
            <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}" alt="">
        </button>
        <p>${movie.title || movie.name}</p>`;

    const cardMovie = document.createElement('div');
    cardMovie.classList.add("movie-card");
    cardMovie.appendChild(imgMovie);
    container.appendChild(cardMovie);

    // Selecionar o botão dentro do cardMovie
    const btnMovie = cardMovie.querySelector('.btn-movie');

    btnMovie.addEventListener('click', () => {
        // Limpar o conteúdo atual do elemento 'main'
        main.innerHTML = "";

        // Criar o conteúdo do filme selecionado
        main.innerHTML = `
            <div class="container movie-container">
                <div class="imagem">
                    <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}" alt="">
                    <button type="button" id="${movie.id}" class="btn btn-secondary btn-lg btn-color botaoLado"><span class="material-symbols-outlined">
                    <i class="fa-solid fa-plus"></i>
                   </span>
                   <p>Minha lista</p>
                   </button>
                </div>
                <div class="textos">
                    <h1>${movie.title || movie.name}</h1>
                    <div class="avaliacoes">
                        <p><i class="fa-solid fa-star"></i> ${parseFloat(movie.vote_average).toFixed(1)}</p>
                        <p>${movie.release_date || movie.first_air_date}</p>
                    </div>
                    <h2>Overview</h2>
                    <p>${movie.overview}</p>
                    <button type="button" id="verDetalhes" class="btn btn-secondary btn-lg btn-light verTrailer" data-toggle="modal" data-target="#exampleModalCenter">Ver trailer</button>
                </div>
              
            </div>`;
        const botao = document.querySelector(".botaoLado");

        botao.addEventListener('click', (event) => {
            const botao = event.target;
        
            if (botao.classList.contains("azul")) {
                const index = favorites.findIndex(fav => fav.id == movie.id);
                if (index !== -1) {
                    favorites.splice(index, 1);
                }
            } else {
              
                favorites.push( movie);
                console.log(favorites)

                renderFavorites()
            }
            
         
        });
        
        
        function renderFavorites() {
            mainfav.innerHTML = '';
            favorites.forEach(element => {
              const listFav = document.createElement('div');
              listFav.classList.add('fav-list');
              listFav.innerHTML = `
                <img src="https://image.tmdb.org/t/p/original/${element.poster_path}" alt="${element.title}">
                <div class="movie-info">
                  <h3>${element.title}</h3>
                  <span class="${getClassByRate(element.vote_average)}">${parseFloat(element.vote_average).toFixed(1)}</span>
                </div>
                <div class="overview">
                  <h3>Overview</h3>
                  ${element.overview}
                </div>
              `;
              mainfav.appendChild(listFav);

              return favorites
            });
          
            mainfav.style.display = "none";
          
            // Event listener para exibir favoritos
            const listButton = document.querySelector('.active-list');
            const activeMain = document.querySelector('.active-main');
            listButton.addEventListener('click', () => {
              mainfav.style.display = "flex";
              main.style.display = "none";
              mainSearch.style.display = "none"
            });
            activeMain.addEventListener('click', () => {
              mainfav.style.display = "none";
              main.style.display = "flex";
            });
          }
          
        
        
        
        

        const movieContainer = document.querySelector('.movie-container');
        movieContainer.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`;
        const idMovie = movie.id;
        const title = movie.title;
        console.log(idMovie);
        console.log(title);
        const btnTrailer = document.querySelector('.verTrailer')

        btnTrailer.addEventListener('click', () => {

            fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=c6c380f82908eab9870589641a012358&language=pt-BR`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro na resposta da API');
                    }
                    return response.json();
                }).then(data => {
                    const trailers = data.results;
                   
                    const modal = document.createElement("div");
                    modal.classList.add("modal" , "fade")
                    modal.id ="exampleModalCenter" ;
                    modal.innerHTML=`<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div class="modal-content modal-lg">
                      <div class="modal-body">
                      <div class="container-fluid">
                      <iframe width="700" height="350" src="https://www.youtube.com/embed/${trailers[0].key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

                      </div>
                    </div>
                  </div>`
                    console.log(trailers[0].key)
                  document.body.appendChild(modal)
                  modal.classList.add("show")
                  modal.style.display="block"
                    
                  
                }
                )
            
        })
    });
}


//funcao de requerimento da url dos poster e do conteiner que ele sera adicionado
function fetchDataAndRender(url, container) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const movies = data.results;
            movies.forEach(movie => {
                createCard(movie, container);
            });
        })
}

//criando as funções para passar a funcao e passar seus parametros de conteudo
function fetchMoviesData() {
    fetchDataAndRender(urlMovie, releasesMovies);
}

function fetchMoviesDataTop() {
    fetchDataAndRender(urlMovieTop, ratedMovies);
}

function fetchSeriesData() {
    fetchDataAndRender(urlSerie, series);
}

function fetchSeriesDataTop() {
    fetchDataAndRender(urlSerieTop, ratedSeries);
}

//chamando as funções
fetchMoviesData();
fetchMoviesDataTop();
fetchSeriesDataTop();
fetchSeriesData();

//eventlister para ele passar 900px pra esquerda ou para a direita
const scrollAmount = 850;


//função de mover para a esquerda e para direita a lista do overflow hidden
document.getElementById('scroll-left-releases').addEventListener('click', () => {
    document.getElementById('releases').querySelector('.movie-slide').scrollLeft -= scrollAmount;
});

document.getElementById('scroll-right-releases').addEventListener('click', () => {
    document.getElementById('releases').querySelector('.movie-slide').scrollLeft += scrollAmount;
});

document.getElementById('scroll-left-top-rated').addEventListener('click', () => {
    document.getElementById('top-rated').querySelector('.movie-slide').scrollLeft -= scrollAmount;
});

document.getElementById('scroll-right-top-rated').addEventListener('click', () => {
    document.getElementById('top-rated').querySelector('.movie-slide').scrollLeft += scrollAmount;
});
document.getElementById('scroll-left-top-rated-series').addEventListener('click', () => {
    document.getElementById('top-rated-series').querySelector('.movie-slide').scrollLeft -= scrollAmount;
});

document.getElementById('scroll-right-top-rated-series').addEventListener('click', () => {
    document.getElementById('top-rated-series').querySelector('.movie-slide').scrollLeft += scrollAmount;
});
document.getElementById('scroll-left-releases-series').addEventListener('click', () => {
    document.getElementById('releases-series').querySelector('.movie-slide').scrollLeft -= scrollAmount;
});

document.getElementById('scroll-right-releases-series').addEventListener('click', () => {
    document.getElementById('releases-series').querySelector('.movie-slide').scrollLeft += scrollAmount;
});
