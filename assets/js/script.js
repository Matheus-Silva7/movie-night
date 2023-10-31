//chamando as apis
const apiKey = "c6c380f82908eab9870589641a012358";
const urlMovie = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&language=pt-BR&page=1`;
const urlMovieTop = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=pt-BR&page=1`;
const urlSerie = `https://api.themoviedb.org/3/trending/tv/week?api_key=${apiKey}&language=pt-BR&page=1`;
const urlSerieTop = `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=pt-BR&page=1`;

const swiperSlider = document.querySelector('.swiper-wrapper');

fetch(urlMovie, { method: "get" })
  .then(resultado => resultado.json())
  .then(dados => showInfo(dados));

let favorites = []

// carregando 
document.addEventListener('DOMContentLoaded', () => {
  carregandoFavoritos();
  renderFavorites();
});

function carregandoFavoritos() {
  const storedFavorites = localStorage.getItem('favorites');
  if (storedFavorites) {
    favorites = JSON.parse(storedFavorites);
  }
}

function salvandoFavoritos() {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function showInfo(images) {
  const results = images.results;

  for (let i = 0; i < 7 && i < results.length; i++) {
    const element = results[i];

    // Crie um novo elemento de imagem para cada backdrop e adicione-o ao swiperSlider
    const imgSlide = document.createElement('div');
    imgSlide.classList.add('project-img');
    imgSlide.innerHTML = `
   
    <div class="img-container">
    
      <img src="https://image.tmdb.org/t/p/original/${element.backdrop_path}" alt="">
    
    <div class="items">
    <div class="text">
      <h3>${element.title || element.name}</h3>
      <h5>${element.release_date || element.first_air_date}</h5>
    </div>
    <div class="button-add">
   
    <button type="button" id="${element.id}" class="btn btn-secondary btn-lg btn-color  botaoLado "><span class="material-symbols-outlined">
    <i class="fa-solid fa-plus"></i>
    </span>
    <p>Minha lista</p>
    </button>

    </div>
  </div>
  
  </div>
    `;
    const slider = document.createElement('div');
    slider.classList.add('swiper-slide');
    slider.appendChild(imgSlide);

    swiperSlider.appendChild(slider);

    const botao = slider.querySelectorAll(".botaoLado");

    botao.forEach(botao => {
      botao.addEventListener('click', () => {
        if (botao.classList.contains("azul")) {
          // Se o botão já estiver azul, remova-o da lista de favoritos
          const index = favorites.findIndex(fav => fav.id == element.id);
          if (index !== -1) {
            favorites.splice(index, 1);
          }
        } else {
          favorites.push(element);


        }
        // Alterne a classe azul/botaoLado no botão
        botao.classList.toggle("azul");
        botao.classList.toggle("botaoLado");
        console.log(favorites)
        // Renderize a lista de favoritos
        renderFavorites();

        salvandoFavoritos()
        carregandoFavoritos()
        /*  if (favorites.length === 0){  
         } */
      });
    });
  }
}

const mainfav = document.getElementById('main-fav');
const main = document.getElementById('main-index');
const mainSearch = document.getElementById('main-search');

function renderFavorites() {
  mainfav.innerHTML = '';
  favorites.forEach(element => {
    const listFav = document.createElement('div');
    listFav.classList.add('listM');
    listFav.innerHTML = `
      <img src="https://image.tmdb.org/t/p/original/${element.poster_path}" alt="${element.title}">
      <div class="movie-info">
        <h3>${element.title || element.name}</h3>
        <span class="${getClassByRate(element.vote_average)}">${parseFloat(element.vote_average).toFixed(1)}</span>
      </div>
      <div class="overview">
        <h3>Overview</h3>
        ${element.overview}
      </div>
    `;
    mainfav.appendChild(listFav);
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


function getClassByRate(vote) {
  if (vote >= 8) {
    return 'green'
  } else if (vote >= 5) {
    return 'orange'
  } else {
    return 'red'
  }
}

/* function removeFavorite(movieId) {
  const index = favorites.findIndex(favorite => favorite.id === movieId);

  if (index !== -1) {
    favorites.splice(index, 1);
  }

  const btncolor = document.querySelector('.btn-color')
  btncolor.classList.remove('azul')
  renderFavorites(); 
}
 */

var swiper = new Swiper(".swiper", {
  cssMode: true,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination"
  },
  keyboard: true,
})


// main 



//chamando classes das categorias para adicionar os posters
const releasesMovies = document.querySelector('.releases-movies');
const ratedMovies = document.querySelector('.rated-movies');
const ratedSeries = document.querySelector('.rated-series');
const series = document.querySelector('.series');

// Função para criar cartões dos filmes e series da main
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
  const btnMovieDetalhes = swiperSlider.querySelector('.verDetalhes');

  sla(btnMovie)

  function sla(addEvent) {
    addEvent.addEventListener('click', () => {
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
              <button type="button"  class="btn btn-secondary btn-lg btn-light verTrailer" data-toggle="modal" data-target="#exampleModalCenter">Ver trailer</button>
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

          favorites.push(movie);
          console.log(favorites)

        }
        salvandoFavoritos()
        carregandoFavoritos()
        renderFavorites()
      });

      function renderFavorites() {
        mainfav.innerHTML = '';
        favorites.forEach(element => {
          const listFav = document.createElement('div');
          listFav.classList.add('listM');
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
        
        fetch(`https://api.themoviedb.org/3/${movie.media_type}/${movie.id}/videos?api_key=c6c380f82908eab9870589641a012358&language=pt-BR`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Erro na resposta da API');
            }
            return response.json();
          }).then(data => {
            const trailers = data.results;

            const modal = document.createElement("div");
            modal.classList.add("modal", "fade")
            modal.id = "exampleModalCenter";
            modal.innerHTML = `<div class="modal-dialog modal-dialog-centered modal-lg " role="document">
              <div class="modal-content modal-lg">
                <div class="modal-body">
                <div class="container-fluid">
                <iframe width="800" height="400" src="https://www.youtube.com/embed/${trailers[0].key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              </div>
                </div>
                <div class="modal-footer">
                <h6 style="color: white;">${movie.title || movie.name}<h6 style="color: white;">
              <button type="button" id="closeModal" class="btn btn-secondary " data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>`

            document.body.appendChild(modal)


            console.log(trailers[0].key)



            modal.style.display = "block"
            modal.classList.add("show")
            const close = document.getElementById("closeModal")

            close.addEventListener('click', () => {
              document.body.removeChild(modal)
            })

          }
          )

      })
    });
  }
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
