const inputSearch = document.querySelector('.search');
const buttonSearch = document.querySelector('.input_search_icon');

buttonSearch.addEventListener('click', () => {
  searchMovies();
  mainfav.style.display = "none"
  const descricaoFilme = document.querySelector('.descricaoFilme').style.display = "none"
  const pageH4 = document.querySelector('.page').textContent = ""
});
inputSearch.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    searchMovies();
    mainfav.style.display = "none"
    const descricaoFilme = document.querySelector('.descricaoFilme').style.display = "none"
    const pageH4 = document.querySelector('.page').textContent = ""
  }
});

inputSearch.addEventListener('input', function () {
  this.style.color = 'white';
});

function searchMovies() {
  const searchTerm = inputSearch.value.trim();

  if (searchTerm !== '') {
    fetch(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=pt-BR&query=${searchTerm}&page=1&include_adult=false`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na resposta da API');
        }
        return response.json();
      })
      .then(data => {
        const movies = data.results;

        if (movies.length === 0) {
          console.log(`Nenhum titulo encontrado para: "${searchTerm}"`);
          mainSearch.innerHTML = `<h1>Nenhum titulo encontrado para: "${searchTerm}"</h1>`
          main.style.display = 'none';
          mainSearch.style.display = 'flex';
          mainSearch.style.height = "90vh"
        } else {
          const fragment = document.createDocumentFragment(); // Criar um fragmento

        let Img;
          movies.forEach(movie => {
            if(movie.poster_path != null){
              Img = `https://image.tmdb.org/t/p/original/${movie.poster_path}`
            } else {
              Img ='assets/img/image-not-found.png'
            }
            const listSearch = document.createElement('div');
            listSearch.classList.add('listM');
            listSearch.innerHTML = `
              <img src=${Img} alt="${movie.title || movie.name}">
              <div class="movie-info">
                <h3>${movie.title || movie.name}</h3>
                <span class="${getClassByRate(movie.vote_average)}">${parseFloat(movie.vote_average).toFixed(1)}</span>
              </div>
              <div class="overview">
                <h3>Overview</h3>
                ${movie.overview}
                <button id="${movie.id}" class="btn-movie">Mais detalhes</button>
              </div>
            `;
            fragment.appendChild(listSearch); // Anexar ao fragmento

            listSearch.querySelector('.btn-movie').addEventListener('click', () => {
              console.log(movie.id);
              mainSearch.innerHTML = "";

              // Criar o conteúdo do filme selecionado
              mainSearch.innerHTML = `
              <button class="btn-back"><i class="fa-solid fa-arrow-left"></i></button>
                  <div class="container movie-container">
                      <div class="imagem-desc">
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
                              <p> <i class="fa-solid fa-star"></i> ${parseFloat(movie.vote_average).toFixed(1)} (${movie.vote_count})</p>
                              <p>${movie.release_date || movie.first_air_date}</p>
                          </div>
                          <h2>Overview</h2>
                          <p>${movie.overview}</p>
                          <button type="button" id="verDetalhes" class="btn btn-secondary btn-lg btn-light verTrailer" data-toggle="modal" data-target="#exampleModalCenter">Ver trailer</button>
                      </div>
                  </div>`;

              const movieContainer = document.querySelector('.movie-container');
              movieContainer.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`;

              const btnTrailer = document.querySelector('.verTrailer')
              btnTrailer.addEventListener('click', () => {

                fetch(`https://api.themoviedb.org/3/${movie.media_type || "movie" || "tv"}/${movie.id}/videos?api_key=${apiKey}&language=pt-BR`)
                  .then(response => {
                    if (!response.ok) {
                      throw new Error('Erro na resposta da API');
                    }
                    return response.json();
                  }).then(data => {
                    const trailers = data.results;

                    if (trailers.length > 0) {
                      // Se houver trailers, crie o modal
                      const modal = document.createElement('div');
                      modal.classList.add('modal', 'fade');
                      modal.id = 'exampleModalCenter';
                      modal.innerHTML = `
                        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                          <div class="modal-content modal-lg">
                            <div class="modal-body">
                              <div class="container-fluid">
                                <iframe width="800" height="400" src="https://www.youtube.com/embed/${trailers[0].key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                              </div>
                            </div>
                            <div class="modal-footer">
                              <h6 style="color: white;">${movie.title || movie.name}</h6>
                              <button type="button" id="closeModal" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                          </div>
                        </div>`;
                      document.body.appendChild(modal);

                      modal.style.display = 'block';
                      modal.classList.add('show');

                      const close = document.getElementById('closeModal');
                      close.addEventListener('click', () => {
                        document.body.removeChild(modal);
                      });
                    } else {
                      alert('Não há trailers disponíveis.');
                    }
                  })
              })
              //btn para voltar para a lista de pesquisa
              const btnBack = document.querySelector('.btn-back')
              btnBack.addEventListener('click', () => {
                searchMovies(searchTerm)
              })
            });
          })

          // Limpar o conteúdo atual do mainSearch
          while (mainSearch.firstChild) {
            mainSearch.removeChild(mainSearch.firstChild);
          }

          mainSearch.appendChild(fragment); // Anexar o fragmento a mainSearch
          main.style.display = 'none';
          mainSearch.style.display = 'flex';
          mainSearch.style.height = '100%'
        }
      })
  } else {
    const message = 'Nenhum termo de pesquisa foi inserido.';
    alert(message);
  }
}



