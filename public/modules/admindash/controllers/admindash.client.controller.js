'use strict';

angular.module('admindash').controller('AdmindashController', ['$scope', 'adminpageService',
	function($scope, adminpageService) {
		$scope.adminpageContent = {};
		try {
		  $scope.adminpageContent = adminpageService.getContent();
		} catch (error) {
		  console.error(error);
		}
	}
]);