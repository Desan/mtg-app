angular
	.module('cardView')
	.directive('cardView', function() {
		return {
			templateUrl: 'assets/html/card-view/card-view.template.html',
			scope: { card: '=' },
			bindToController: true,
			replace: true,
			restrict: 'E',
			controller: cardView,
			controllerAs: '$ctrl'
		};		
	});

cardView.$inject = ['$rootScope', '$scope'];

function cardView($rootScope, $scope) {

	var keyrunePrefix = 'ss-';

	return {

		currentEdition: 0,
		
		setActiveEdition: function(editionId) {
			this.currentEdition = editionId;
		},

		isCurrent: function(editionId) {
			return this.currentEdition === editionId
		},

		getEditionClass: function(edition) {
			return keyrunePrefix + edition.set_id.toLowerCase()
		},

		getRarityClass: function(edition) {
			return keyrunePrefix + edition.rarity.toLowerCase()
		},

		getFullCardType: function(card) {
			var subTypes = card.subtypes,
				superTypes = card.supertypes,
				types = card.types,
				spitter = (subTypes) ? ['\u2014'] : [],
				result = [];

			return result = result.concat(superTypes, types, spitter, subTypes).join(' ');
		}

	}

};