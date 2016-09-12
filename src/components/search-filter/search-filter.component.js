angular.module('searchFilter').component('searchFilter', {
  templateUrl: 'assets/html/search-filter/search-filter.template.html',
  controller: searchFilter
})

searchFilter.$inject = ['$scope', 'deckbrewAPI'];

function searchFilter($scope, deckbrewAPI) {

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

  $scope.filter = {};

  function resetFilters() {
    $scope.filter.oracle = '';
    $scope.filter.format = null;
    $scope.filter.set = [];
    $scope.filter.type = [];
    $scope.filter.subtype = [];
    $scope.filter.supertype = [];
    $scope.filter.color = [];
    $scope.filter.multicolor = null;
    $scope.filter.rarity = [];
  };

  resetFilters();

  return {

    toggleSelection: function(arr, value) {
      var idx = arr.indexOf(value);

      if (idx > -1) {
        arr.splice(idx, 1);
      } else {
        arr.push(value)
      }
    },

    applyFilter: function(filter) {
      $scope.$emit('filter-change', filter);
    },

    filtersOptions: deckbrewAPI.searchFiltersOptions,
    resetFilters: resetFilters

  }

};
