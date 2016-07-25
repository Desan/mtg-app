angular.module('cardImage').component('cardImage', {
	templateUrl: 'components/card-image/card-image.template.html',
	bindings: {
		card: '<'
	},
	controller: cardImage
});

function cardImage() {

	return {

		currentEdition: 0,
		keyrunePrefix: 'ss-',

		setActiveEdition: function(editionId) {
			this.currentEdition = editionId;
		},

		isCurrent: function(editionId) {
			return this.currentEdition === editionId
		},

		getEditionClass: function(edition) {
			return this.keyrunePrefix + edition.set_id.toLowerCase()
		},

		getRarityClass: function(edition) {
			return this.keyrunePrefix + edition.rarity.toLowerCase()
		}


	}

};