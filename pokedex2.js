// Recuperar la lista con el id "pokedex" y almacenarla en una variable.
const pokedex$$ = document.getElementById('pokedex');

// Función para recuperar los primeros 150 Pokémon de la API.
//Creamos un array vacío para almacenar los datos de los 150 Pokemons (const resultado)
//Cada vez que obtenemos 1 pokemon a través del bucle for los datos se agregan al array

//Función flecha --- asíncrona
const getPokemon = async () => {
  try {
    //Dentro de la funcion he creado un array vacío para almacenar los datos de los 150 Pokemons
    const resultado = [];
    for (let i = 1; i <= 150; i++) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      const data = await response.json();
    //Los vamos agregando al array mediante el método .push
      resultado.push(data);
    }
    //Aqui nos devuelve el array completo con los 150 pokemon
    return resultado;

    //Si se produce un error imprimimos en consola el mensaje
  } catch (error) {
    console.log('Error: ', error);
  }
};

// Función para mapear la información recuperada de la API (bloque de notion)
//Esta función recibe el array de resultados y con map los recorre.
//Para cada elemento del array se crea un objeto con los atributos name, image, type, id
const mapPokemon = (resultado) => {
  const pokemon = resultado.map((result) => ({
    name: result.name,
    image: result.sprites['front_default'],
    type: result.types.map((type) => type.type.name).join(', '),
    id: result.id
  }));
  return pokemon;
};

//Form
//Recuperamos el elemento html del formulario a través de su clase 
const form$$ = document.querySelector('.buscador');

//Este evento comienza cuando pulsamos el boton de buscar del formulario
form$$.addEventListener('submit', searchPokemon);

//Para recuperar el valor del campo de entrada

const buscar = document.querySelector('#search').value;

//Luego una función que filtra los Pokemons

function searchPokemon(event) {
  event.preventDefault(); // prevenir la recarga de la página al enviar el formulario
  const searchValue = document.querySelector('#search').value;
  const filteredPokemon = filterPokemon(searchValue, pokemonList);
  displayPokemon(filteredPokemon);
}






const listaPokemon = (filtro, pokemonMapeados) => {
    let pokemonFiltrados = pokemonMapeados.filter((pokemon) => pokemon.nombre.toLowerCase().includes(filtro.toLowerCase()));
    // le mando los pokemos filtrados a la función que pinta
    console.clear();
    console.log(pokemonFiltrados);
    draw(pokemonFiltrados);
};




// Función para imprimir la lista de Pokémon en el HTML.
//Con el método forEach recorremos el array de los pokemons que hemos mapeado
const displayPokemon = (pokemon) => {
  pokemon.forEach((p) => {
    const pokemonEl$$ = document.createElement('div');
    pokemonEl$$.classList.add('pokemon');
    const pokemonInnerHTML = 

//Para cada Pokemon creo un elemento div que contenga la imagen, el nombre , numero y tipo de Pokemon

    `

      <div class="img-container">
        <img src="${p.image}">
      </div>
      <div class="info">
        <span class="number">#${p.id.toString().padStart(3, '0')}</span>
        <h3 class="name">${p.name}</h3>
        <small class="type">Type: ${p.type}</small>
      </div>
    `;
    pokemonEl$$.innerHTML = pokemonInnerHTML;
    pokedex$$.appendChild(pokemonEl$$);
  });
};

// Función para ejecutar el fetch y las funciones de mapeo e impresión.
const init = async () => {
  const results = await getPokemon();
  const pokemon = mapPokemon(results);
  displayPokemon(pokemon);
};





// Llamada a la función init al cargar la página.
window.onload = init;
