// variaveis
const pokemonName = document.querySelector('.pokeName');
const pokemonId = document.querySelector('.pokeNumber');
const pokemonImage = document.querySelector('.pokemon-image');
const searchPoke = document.querySelector('.search-poke');
const proxPoke = document.querySelector('.proximo');
const antePoke = document.querySelector('.anterior');

const form = document.querySelector('.form');

let seqPokemon = 1;

// coletando dados da API via json
const fetchPokemon = async (pokemon) => {

    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (apiResponse.status != 404) {
        const data = await apiResponse.json();
        return data;
    }
}

// colocando as variaveis recebidas do json no html
const renderPokemon = async (pokemon) => {

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonName.innerHTML = data.name;
        pokemonId.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        searchPoke.value = '';
        seqPokemon = data.id;
    } else {
        pokemonName.innerHTML = 'Não Encontrado ;-;';
        pokemonId.innerHTML = '';
        pokemonImage.src = '';
        searchPoke.value = '';
    }
}

// função da pesquisa e botões "anterior" e "proximo"
form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(searchPoke.value.toLowerCase());
})

proxPoke.addEventListener('click', () => {
    seqPokemon += 1;
    renderPokemon(seqPokemon);
})

antePoke.addEventListener('click', () => {
    if (seqPokemon > 1) {
        seqPokemon -= 1;
        renderPokemon(seqPokemon);
    }
})

renderPokemon(seqPokemon)