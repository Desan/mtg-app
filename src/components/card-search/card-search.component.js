
angular
  .module('cardSearch')
  .component('cardSearch', {
    templateUrl: 'assets/html/card-search/card-search.template.html',
    controller: cardSearch
  });

cardSearch.$inject = ['$scope', '$rootScope', 'deckbrewAPI'];

function cardSearch($scope, $rootScope, deckbrewAPI) {

  $scope.searchQuery = {};

  $scope.$on('filter-change', function(event, msg) {
    angular.extend($scope.searchQuery, msg);
    getCard()
  });

  function getCard() {
    deckbrewAPI.search($scope.searchQuery);
  }

  return {
    getCard: getCard
  }

};
