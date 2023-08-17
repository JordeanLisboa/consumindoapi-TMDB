// Chave de API para autenticação com a API do The Movie Database (TMDb)
const apiKey = 'd44492877e938bd50f8babe5fa4c855f';

// URL da API para obter a lista de gêneros de filmes
const genresEndpoint = 'https://api.themoviedb.org/3/genre/movie/list?language=pt-BR&api_key=' + apiKey;

// Variável para armazenar o ID do gênero selecionado pelo usuário
let selectedGenreId = '';

// Função para exibir os filmes na página

function mostrarValores(filmes) {
    // Obtém o elemento HTML onde os filmes serão exibidos
    const divFilmes = document.getElementById("filmes");

    // Mapeia a matriz de filmes para gerar o HTML de cada filme
    const filmesHTML = filmes.map(filme => {
        return `
        <div class="col">
            <body class="bg-dark text-lista">
            <div class="card bg-dark text-light">
                <!-- Exibe a imagem do pôster do filme -->
                <img src="https://image.tmdb.org/t/p/w500/${filme.poster_path}" class="card-img-top" alt="${filme.title}">
                <div class="card-body">
                    <!-- Exibe o título do filme -->
                    <h5 class="card-title">${filme.title}</h5>
                    <!-- Exibe a sinopse do filme -->
                    
                    <p class="card-text limitar-linhas">${filme.overview}</p>
                </div>
            </div>
        </div>`;
    });


    divFilmes.innerHTML = `<div class="row">${filmesHTML.join("")}</div>`;
}



fetch(genresEndpoint)
    .then(response => response.json())
    .then(data => {

        const genreSelect = document.getElementById('genreSelect');


        data.genres.forEach(genre => {
            const option = document.createElement('option');
            option.value = genre.id;
            option.textContent = genre.name;
            genreSelect.appendChild(option);
        });

        
        genreSelect.addEventListener('change', () => {
    
            selectedGenreId = genreSelect.value;
    
            getAndDisplayMovies();
        });
    })
    .catch(error => console.error('Erro ao obter os gêneros:', error));


const moviesEndpoint = 'https://api.themoviedb.org/3/discover/movie?language=pt-BR&api_key=' + apiKey;

function getAndDisplayMovies() {
    const filteredEndpoint = selectedGenreId
        ? `${moviesEndpoint}&with_genres=${selectedGenreId}`
        : moviesEndpoint;

    // função para buscar dados da API
    getDadosAPI(filteredEndpoint)
        .then(filmes => mostrarValores(filmes))
        .catch(error => console.error("Erro ao obter os dados da API:", error));
}


async function getDadosAPI(endPoint) {
    try {
        // Faz uma solicitação à API e aguarda a resposta
        const res = await fetch(endPoint);
        // Converte a resposta em formato JSON
        const data = await res.json();
        const filmes = data.results;
        return filmes;
    } catch (error) {
        // retorna erro
        throw error;
    }
}


getAndDisplayMovies();
