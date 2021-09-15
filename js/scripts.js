// pokemonRepository variable is assigned to IIFE
let pokemonRepository = (function() {
  let pokemonList = [ // pokemonList only accessible through the functions returned by IIFE
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

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  return { //this return contains an object
    getAll: getAll,
    add: add
  };
})();

pokemonRepository.add(
  {
    name: 'Dragonite',
    height: 2.2,
    weight: 210,
    type: ['Dragon','Flying']
  }
);

// forEach function that iterates over each Pokémon
pokemonRepository.getAll().forEach(function(pokemon) { // function declaration as parameter to forEach() function
  document.write('<p>' + 'Name: ' + pokemon.name + ', Height: ' + pokemon.height + ' m' + '</p>');
});