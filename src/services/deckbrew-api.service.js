angular.module('app').service('deckbrewAPI', deckbrewAPI);

deckbrewAPI.$inject = ['$http', '$rootScope']

function deckbrewAPI($http, $rootScope) {

  var options = {
    method: 'GET',
    url: 'https://api.deckbrew.com/mtg/cards',
    params: {
      name: ''
    }
  };

  var apiUrl = 'https://api.deckbrew.com/mtg/';

  var searchFiltersOptions = {
    colors: ['black', 'blue', 'green', 'red', 'white'],
    rarity: ['common', 'uncommon', 'rare', 'mythic'],
    formats: ['vintage', 'legacy', 'modern', 'standard', 'commander']
  };

  $http.get(apiUrl+'sets').then(function(response) {
    return searchFiltersOptions.sets = response.data
  });

  $http.get(apiUrl+'types').then(function(response) {
    return searchFiltersOptions.types = response.data
  });

  $http.get(apiUrl+'subtypes').then(function(response) {
    return searchFiltersOptions.subtypes = response.data
  });

  $http.get(apiUrl+'supertypes').then(function(response) {
    return searchFiltersOptions.supertypes = response.data
  });

  function parseHeaderLink(link) {
    if (link.length == 0) {
      throw new Error("input must not be of zero length");
    }

    // Split parts by comma
    var parts = link.split(',');
    var links = {};
    // Parse each part into a named link
    parts.forEach(function(p) {
      var section = p.split(';');

      if (section.length != 2) {
        throw new Error("section could not be split on ';'");
      }
      
      var url = section[0].replace(/<(.*)>/, '$1').trim();
      var name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;
    });

    return links;
  }

  return {

    search: function(params) {
      options.params = params;
      $http(options).then(
        function(response) {
          $rootScope.$emit('searchResponce', response.data);
        },
        function(error) {
          console.log('Data senderror');
      });
    },

    searchFiltersOptions: searchFiltersOptions

  }

};