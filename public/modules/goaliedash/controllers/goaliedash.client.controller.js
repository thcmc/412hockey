'use strict';

angular.module('goaliedash').controller('GoaliedashController', ['$scope', 'Authentication', 'goaliepageService',
	function($scope, Authentication, goaliepageService) {
		
		$scope.authentication = Authentication;

		$scope.goaliepageContent = {};
		try {
		  $scope.goaliepageContent = goaliepageService.getContent();
		} catch (error) {
		  console.error(error);
		}
	}
]);