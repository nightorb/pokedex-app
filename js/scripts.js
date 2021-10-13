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
    let pokemonList = document.querySelector('.list-group');
    let pokemonListItem = document.createElement('li');
    pokemonListItem.classList.add('group-list-item','col-xl-3','col-md-4','col-8');

    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn','btn-dark','btn-block');
    button.setAttribute('data-toggle','modal');
    button.setAttribute('data-target','#pokemon-modal;')

    pokemonListItem.appendChild(button);
    pokemonList.appendChild(pokemonListItem);
    buttonEvent(button, pokemon);
  }

  // separate function for adding event listener to button, logs pokémon's details on-click
  function buttonEvent(button, pokemon) {
    button.addEventListener('click', () => showDetails(pokemon))
  }

  // loading message
  let loadingMessage = (function() {
    let pokemonList = document.querySelector('.list-group');
    let loadingMessage = document.createElement('p');
    loadingMessage.innerText = 'Loading Pokédex...';
    
    function show() {
      pokemonList.appendChild(loadingMessage);
    };
    
    function hide() {
      pokemonList.removeChild(loadingMessage);
    };
    
    return {
      show: show,
      hide: hide
    };
  })();
  
  // loadList fetches data from api
  function loadList() {
    loadingMessage.show();    
    return fetch(apiURL).then(function(response) {
      loadingMessage.hide();    
      return response.json();
    }).then(function(json) {      
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
      loadingMessage.hide();
      console.error(e);
    });
  }

  function loadDetails(pokemon) {
    loadingMessage.show();
    let url = pokemon.detailsURL;
    return fetch(url).then(function(response) {
      loadingMessage.hide();
      return response.json();
    }).then(function(details) {
      // now adding details to the pokémon item
      pokemon.id = details.id;
      pokemon.imageURL = details.sprites.other.dream_world.front_default;
      pokemon.height = details.height;
      pokemon.weight = details.weight;
      pokemon.types = details.types;
      pokemon.abilities = details.abilities;
    }).catch(function(e) {
      loadingMessage.hide();
      console.error(e);
    });
  }  

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      showModal(pokemon);
    });
  }

  function showModal(pokemon) {
    let modalBody = document.querySelector('.modal-body');
    let modalTitle = document.querySelector('.modal-title');

    modalBody.innerText = '';
    modalTitle.innerText = '';

    // modal title
    let titleElement = document.createElement('h1');
    titleElement.innerText = '#' + pokemon.id + ' ' + pokemon.name;

    //modal content
    let pokemonImage = document.createElement('img');
    pokemonImage.src = pokemon.imageURL;
    pokemonImage.classList.add('modal-img');

    let heightElement = document.createElement('p')
    heightElement.innerText = 'Height: ' + pokemon.height / 10 + ' m';

    let weightElement = document.createElement('p');
    weightElement.innerText = 'Weight: ' + pokemon.weight / 10 + ' kg';

    let pokemonTypes = [];
    Object.keys(pokemon.types).forEach(key => {
      pokemonTypes.push(' ' + pokemon.types[key].type.name);
    });

    let typesElement = document.createElement('p');
    typesElement.innerText = 'Type: ' + pokemonTypes;

    let pokemonAbilities = [];
    Object.keys(pokemon.abilities).forEach(key => {
      pokemonAbilities.push(' ' + pokemon.abilities[key].ability.name);
    });

    let abilitiesElement = document.createElement('p');
    abilitiesElement.innerText = 'Abilities: ' + pokemonAbilities;

    modalTitle.appendChild(titleElement);
    modalBody.appendChild(pokemonImage);
    modalBody.appendChild(heightElement);
    modalBody.appendChild(weightElement);
    modalBody.appendChild(typesElement);
    modalBody.appendChild(abilitiesElement);

    $('#pokemon-modal').modal('toggle');
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
