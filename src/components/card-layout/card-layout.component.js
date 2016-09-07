angular
	.module('cardLayout')
	.component('cardLayout', {
		templateUrl: 'assets/html/card-layout/card-layout.template.html',
		controller: cardLayout
	});

cardLayout.$inject = ['$scope', '$rootScope'];

function cardLayout($scope, $rootScope) {

	console.log('cardLayout init...');

	$scope.maxItems = 10;

	$rootScope.$on('searchResponce', function(event, msg) {
		$scope.data = msg;
		angular.element('.collapsible').collapsible();
		angular.element('.collapsible-header').click(function() {

			var scrollTarget = angular.element('this');
			console.log('scroll to: '+ scrollTarget);

			$('html, body').stop().animate({
				scrollTop: scrollTarget.offset().top
		}, 2000);

		})
	});
}