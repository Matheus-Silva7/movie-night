const inputSearch = document.querySelector('.search');
const buttonSearch = document.querySelector('.input_search_icon');

buttonSearch.addEventListener('click',  ()=>{
  searchMovies();
  mainfav.style.display = "none"
});
inputSearch.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    searchMovies();
    mainfav.style.display = "none"
  }
});

inputSearch.addEventListener('input', function() {
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
          console.log(`Nenhum filme encontrado para: "${searchTerm}"`);
          mainSearch.innerHTML = `<h1>Nenhum filme encontrado para: "${searchTerm}"</h1>`
          main.style.display = 'none';
          mainSearch.style.display = 'flex';
          mainSearch.style.height = "90vh"
        } else {
          const fragment = document.createDocumentFragment(); // Criar um fragmento

          movies.forEach(movie => {
            const listSearch = document.createElement('div');
            listSearch.classList.add('listM');
            listSearch.innerHTML = `
              <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}" alt="${movie.title}">
              <div class="movie-info">
                <h3>${movie.title || movie.name}</h3>
                <span class="${getClassByRate(movie.vote_average)}">${parseFloat(movie.vote_average).toFixed(1)}</span>
              </div>
              <div class="overview">
                <h3>Overview</h3>
                ${movie.overview}
              </div>
            `;
            fragment.appendChild(listSearch); // Anexar ao fragmento
          });

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



