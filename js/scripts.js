// pokemonRepository variable is assigned to IIFE
let pokemonRepository = (function() {
  // pokemonList only accessible through the functions returned by IIFE
  let pokemonList = [];
  
  function getAll() {
    return pokemonList;
  }

  // adds only objects to pokemonList and checks wheter it includes the required keys
  function add(pokemon) {
    typeof pokemon === 'object' && 'name' in pokemon && 'height' in pokemon && 'weight' in pokemon && 'type' in pokemon ?
    pokemonList.push(pokemon) : console.log('Pokémon is invalid.');

    /* "advanced" version:
    const props = ['name','height','weight','type'];
    const checkObject = Object.keys(pokemon).reduce((accumulator, current) => {
      if(!accumulator) return accumulator;
      return props.includes(current)}, true);
    typeof pokemon === 'object' && checkObject ? pokemonList.push(pokemon) : !pokemonList.push() + console.log('Pokémon is invalid.');
    */
  }

  // adds li to the HTML/DOM
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let pokemonListItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('list-button');
    pokemonListItem.appendChild(button);
    pokemonList.appendChild(pokemonListItem);
    buttonEvent(button, pokemon);
  }

  // separate function for button adding event listener, logs Pokémon's details on-click
  function buttonEvent(button, pokemon) {
    button.addEventListener('click', () => showDetails(pokemon))
  }

  function showDetails(pokemon) {
    console.log(pokemon.name);
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem
  };
})();

//will be added since it's an object
pokemonRepository.add(
  {
    name: 'Dragonite',
    height: 2.2,
    weight: 210,
    type: ['Dragon','Flying']
  }
);

// will not be added since it's a string
pokemonRepository.add('Hello');

// forEach function that iterates over each Pokémon
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});