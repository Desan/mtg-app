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
				console.log(this.currentSize);
				console.log($scope.data.length);
			}
		},
		isOver: function() {
			console.log(this.currentSize <= $scope.data.length);
			return this.currentSize < $scope.data.length
		}
	};

	console.log($scope.layout);

	$rootScope.$on('searchResponce', function(event, msg) {
		$scope.data = msg;
		$scope.maxItems = 25;
		console.log($scope.data.length);
	});

}