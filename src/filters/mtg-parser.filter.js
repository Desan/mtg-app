angular.module('app').filter('mtgParse', mtgParser)

function mtgParser() {

	var createHTMLString = function(el, elClases, content) {

		el = el || 'div';
		elClases = elClases || '';
		content = content || '';
		
		return '<'+el+' class="'+elClases+'">'+content+'</'+el+'>'
	};

	var msClass = function(manaCost) {

		var manaIcons = {

		};

		var splitSymbolClass = ' ms-split';
		var manaCost = manaCost.replace(/\{|\}/g, '').toLowerCase(); // delete brackets

		// find split mana symbol
		if (!manaCost.match(/p/i) && manaCost.match(/\//)) { 
			return 'ms ms-' + manaCost.replace('/', '') + splitSymbolClass 
		}
		else {
			if (manaCost.match(/t/i)) return 'ms ms-tap'
			return 'ms ms-' + manaCost.replace('/', '') 
		}
	};

	return function(text, options) {

		if (!text) return

		var defaults = {
					mana: {
						el: 'span',
						classes: '',
						pattern: /\{[\w, \/]+\}/gi
					},
					p: {
						el: 'p',
						classes: 'card-text__p',
						pattern: /\n/g
					},
					reminder: {
						el: 'span',
						classes: 'card-text__reminder',
						pattern: /\(.+\)/gi
					}
				};
		
		options = options || {};
		options = angular.merge(defaults, options);

		// new line
		text = text.replace(options.p.pattern,'<br />');

		//replace mana
		text = text.replace(options.mana.pattern, function(match) {

			var el = options.mana.el,
				elClases = options.mana.classes + ' ' + msClass(match);

			return createHTMLString(el, elClases)
		});

		//replace reminder
		text = text.replace(options.reminder.pattern, function(match) {

			var el = options.reminder.el,
				elClases = options.reminder.classes;

			return createHTMLString(el, elClases, match)
		})

		return text

	};
};