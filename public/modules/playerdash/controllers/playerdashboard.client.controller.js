'use strict';

angular.module('playerdash').controller('PlayerdashboardController', ['$scope', 'Authentication', 'playerpageService',
	function($scope, Authentication, playerpageService) {
		$scope.authentication = Authentication;


		$scope.playerpageContent = {};
		try {
		  $scope.playerpageContent = playerpageService.getPlayerContent();
		} catch (error) {
		  console.error(error);
		}
		$scope.playerFeatures = {};
		try {
		  $scope.playerFeatures = playerpageService.getPlayerFeatures();
		} catch (error) {
		  console.error(error);
		}
		$scope.playerMenus = {};
		try {
		  $scope.playerMenu = playerpageService.getPlayerMenu();
		} catch (error) {
		  console.error(error);
		}
		$scope.playerNutrition = {};
		try {
		  $scope.playerNutrition = playerpageService.getPlayerNutrition();
		} catch (error) {
		  console.error(error);
		}
		$scope.playerGoals = {};
		try {
		  $scope.playerGoals = playerpageService.getPlayerGoals();
		} catch (error) {
		  console.error(error);
		}
		$scope.playerEvals = {};
		try {
		  $scope.playerEvals = playerpageService.getPlayerEvals();
		} catch (error) {
		  console.error(error);
		}
	}
]);