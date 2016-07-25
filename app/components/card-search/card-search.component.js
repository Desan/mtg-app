angular
	.module('cardSearch')
	.component('cardSearch', {
		templateUrl: 'components/card-search/card-search.template.html',
		controller: cardSearch
	});

cardSearch.$inject = ['$http'];

// TODO: use factory!
function cardSearch(http) {

	var url = 'https://api.deckbrew.com/mtg/cards/typeahead';
	var self = this;

	// TODO: отрефакторить гет запрос в объект
	this.typeAhead = function(query) {

		if(query.length>2) {
			http.get(url+'?q='+query).then(
				function(responce) {
					console.log(responce.data);
					self.data = responce.data;
				},
				function(error) {
					console.log(error);
			});
		}
	};
};

