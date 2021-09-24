// pokemonRepository variable is assigned to IIFE
let pokemonRepository = (function() {
  // pokemonList only accessible through the functions returned by IIFE
  let pokemonList = [];
  let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
  function getAll() {
    return pokemonList;
  }

  // adds only objects to pokemonList and checks wheter it includes the required keys
  function add(pokemon) {
    typeof pokemon === 'object' && 'name' in pokemon && 'detailsURL' in pokemon ?
      pokemonList.push(pokemon) : console.log('Pokémon is invalid.');
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

  // separate function for adding event listener to button, logs pokémon's details on-click
  function buttonEvent(button, pokemon) {
    button.addEventListener('click', () => showDetails(pokemon))
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      console.log(pokemon);
    });
  }

  /* attempt to add a loading message
  let loadingMessage = (function() {
    let pokemonList = document.querySelector('.pokemon-list');
    let loadingMessage = document.createElement('p');
    loadingMessage.innerText = 'Loading Pokédex...';
    
    function showLoadingMessage() {
      pokemonList.appendChild(loadingMessage);
    };
    
    function hideLoadingMessage() {
      document.querySelector(loadingMessage);
      loadingMessage.pokemonList.removeChild(loadingMessage);
    };
    
    return {
      showLoadingMessage: showLoadingMessage,
      hideLoadingMessage: hideLoadingMessage
    };
  })();
  */

  // loadList fetches data from api
  function loadList() {
    
    // ---> !fetch(apiURL) ? loadingMessage.showLoadingMessage() : !loadingMessage.showLoadingMessage();
    
    return fetch(apiURL).then(function(response) {
    
    // ---> loadingMessage.hideLoadingMessage();
      
    return response.json();
    }).then(function(json) {
      
      // ---> loadingMessage.hideLoadingMessage();
      
      json.results.forEach(function(item) {
        // each item should have name and detailsURL property
        // use detailsURL to load detailed data for a given pokémon in loadDetails
        let pokemon = {
          name: item.name,
          detailsURL: item.url
        };
        // each pokémon in fetched data is added to pokemonList with add function
        add(pokemon);
      });
    }).catch(function(e) {
      
      // ---> loadingMessage.hideLoadingMessage();
      
      console.error(e);
    });
  }

  function loadDetails(pokemon) {
    let url = pokemon.detailsURL;
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function(details) {
      // now adding details to the pokémon item
      pokemon.imageURL = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.types = details.types;
    }).catch(function(e) {
      console.error(e);
    });
  }  

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

pokemonRepository.loadList().then(function() {
  // now the data is loaded
  // forEach function that iterates over each pokémon
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
