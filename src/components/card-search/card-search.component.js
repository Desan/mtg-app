
angular
  .module('cardSearch')
  .component('cardSearch', {
    templateUrl: 'assets/html/card-search/card-search.template.html',
    controller: cardSearch
  });

cardSearch.$inject = ['$scope', '$rootScope', 'deckbrewAPI'];

function cardSearch($scope, $rootScope, deckbrewAPI) {

  var menuSearchFilter = angular.element(document).ready(function() {

    var ANIMATION_SPEED = 200,

    //caching DOM
    $menu = $('.search-filters'),
    $menuItems = $('.search-filters__item'),
    $options = $('.search-filters__options'),
    $optionsBody = $('.search-filters__body'),
    $backButton = $('#back-filter'),
    $modal = $('.modal-trigger');

    // binding events
    $backButton.click(openFilterMenu);
    $modal.leanModal({ complete: openFilterMenu });
    $menuItems.each(function() {
      var $el = $(this),
          target = $el.attr('href');

      $el.click(function(e) {
        e.stopPropagation();
        e.preventDefault();

        $optionsBody.hide();
        $(target).show();
        openFilterOptions();
      });
    });

    function openFilterMenu() {
      $menu.animate({left: '0', right: '0'}, ANIMATION_SPEED);
      $options.animate({left: '100%', right: '0'}, ANIMATION_SPEED);
      $optionsBody.hide();
    }

    function openFilterOptions() {
      $menu.animate({left: '-100%', right: '100%'}, ANIMATION_SPEED);
      $options.animate({left: '0', right: '0'}, ANIMATION_SPEED);
    };

    // API
    return {
      openFilterMenu: openFilterMenu,
      openFilterOptions: openFilterOptions
    }

  });

  $scope.searchQuery = {};

  function _resetFilters() {
    $scope.setSelection = [];
    $scope.typeSelection = [];
    $scope.subtypeSelection = [];
    $scope.supertypeSelection = [];
    $scope.colorSelection = [];
    $scope.raritySelection = []; 
  }

  _resetFilters();


  return {

    getCard: function(params) {

      params.set = $scope.setSelection;
      params.type = $scope.typeSelection;
      params.subtype = $scope.subtypeSelection;
      params.supertype = $scope.supertypeSelection;
      params.color = $scope.colorSelection;
      params.rarity =$scope.raritySelection;
      
      deckbrewAPI.search(params);

    },

    clearSearchQuery: function() {
      $scope.searchQuery = {};
      _resetFilters();
    },

    toggleSelection: function(arr, value) {
      var idx = arr.indexOf(value);

      if (idx > -1) {
        arr.splice(idx, 1);
      } else {
        arr.push(value)
      }
    },

    filtersOptions: deckbrewAPI.searchFiltersOptions

  }

};