angular.module('manaCost').component('manaCost', {
	templateUrl: 'components/mana-cost/mana-cost.template.html',
	bindings: {
		cost: '<'
	},
	controller: manaCost
});

function manaCost() {
	
	var splitClass = ' ms-split';

	return {

		convertManaSymbols: function(manaCost) {
			var symbolPattern = /\{[\w, \/]+\}/gi

			var result = manaCost.toLowerCase().match(symbolPattern).map(function(e) {
				n = e.replace(/\{|\}/g, '')
				if (!n.match(/p/i) && n.match(/\//)) { return n.replace('/', '') + splitClass }
				else { return n.replace('/', '') }
			});

			return result
		}

	}

};