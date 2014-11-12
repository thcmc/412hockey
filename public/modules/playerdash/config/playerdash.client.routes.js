'use strict';

//Setting up route
angular.module('playerdash').config(['$stateProvider',
	function($stateProvider) {
		// Playerdash state routing
		$stateProvider.
		state('playerdashboard', {
			url: '/playerdashboard',
			templateUrl: 'modules/playerdash/views/playerdashboard.client.view.html'
		});
	}
]);