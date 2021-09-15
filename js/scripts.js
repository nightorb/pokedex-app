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
  },
];

// for loop that iterates over each item in pokemonList
// writes each Pokémon's name and height on document
/*
for (let i = 0; i < pokemonList.length; i++) {
  document.write('<p>' + pokemonList[i].name + ' (height ' + pokemonList[i].height + ' m)');
  if (pokemonList[i].height > 1.5) {
    document.write(' - Wow, this is a big Pokémon!</p>');
  }
}
*/

// forEach function that iterates over each Pokémon
pokemonList.forEach(function(pokemon) { // function declaration is passed as parameter to forEach() function
  document.write('<p>' + 'Name: ' + pokemon.name + ', Height: ' + pokemon.height + ' m' + '</p>');
});