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

const favorites = []

function showInfo(images) {
  const results = images.results;

  for (let i = 0; i < 5 && i < results.length; i++) {
    const element = results[i];

    // Crie um novo elemento de imagem para cada backdrop e adicione-o ao swiperSlider
    const imgSlide = document.createElement('div');
    imgSlide.classList.add('project-img');
    imgSlide.innerHTML = `
   
    <div class="img-container">
    
      <img src="https://image.tmdb.org/t/p/original/${element.backdrop_path}" alt="">
    
    <div class="items">
    <div class="text">
      <h3>${element.title || element.original_name}</h3>
      <h5>${element.release_date || element.first_air_date}</h5>
      <button type="button" id="verDetalhes" class="btn btn-secondary btn-lg btn-light btn-movie verDetalhes">Ver detalhes</button>
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
          // Se o botão não estiver azul, adicione-o à lista de favoritos
          favorites.push(element);
        }
        // Alterne a classe azul/botaoLado no botão
        botao.classList.toggle("azul");
        botao.classList.toggle("botaoLado");
        console.log(favorites)
        // Renderize a lista de favoritos
        renderFavorites();
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