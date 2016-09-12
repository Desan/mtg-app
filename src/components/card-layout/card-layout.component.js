angular
	.module('cardLayout')
	.component('cardLayout', {
		templateUrl: 'assets/html/card-layout/card-layout.template.html',
		controller: cardLayout
	});

cardLayout.$inject = ['$scope', '$rootScope'];

function cardLayout($scope, $rootScope) {

	$scope.data = [];

	$scope.layout = {
		step: 25,
		currentSize: 25,
		expand: function() {
			if (this.currentSize < $scope.data.length) {
				this.currentSize += this.step;
			}
		},
		isOver: function() {
			return this.currentSize < $scope.data.length
		}
	};


	$rootScope.$on('searchResponce', function(event, msg) {
		$scope.data = msg;
		$('.collapsible').collapsible();
	});

}
