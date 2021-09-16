// pokemonRepository variable is assigned to IIFE
let pokemonRepository = (function() {
  // pokemonList only accessible through the functions returned by IIFE
  let pokemonList = [
    {
      name: 'Bulbasaur',
      height: 0.7,
      weight: 6.9,
      type: ['Grass','Poison']
    },
    {
      name: 'Charmander',
      height: 0.6,
      weight: 8.5,
      type: ['Fire']
    },
    {
      name: 'Squirtle',
      height: 0.5,
      weight: 9,
      type: ['Water']
    },
    {
      name: 'Gastly',
      height: 1.3,
      weight: 0.1,
      type: ['Ghost','Poison']
    },
    {
      name: 'Haunter', // Haunter is my favorite Pokémon
      height: 1.6,
      weight: 0.1,
      type: ['Ghost','Poison']
    },
    {
      name: 'Gengar',
      height: 1.5,
      weight: 40.5,
      type: ['Ghost','Poison']
    }
  ];
  
  function getAll() {
    return pokemonList;
  }

  // adds only objects to pokemonList
  function add(pokemon) {
    typeof pokemon === 'object' /* && Object.keys(pokemon) === ['name','height','weight','type'] */ ? pokemonList.push(pokemon) : !pokemonList.push();
  }

  return {
    getAll: getAll,
    add: add
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
pokemonRepository.getAll().forEach(function(pokemon) { // function declaration as parameter to forEach() function
  document.write('<p>' + 'Name: ' + pokemon.name + ', Height: ' + pokemon.height + ' m' + '</p>');
});