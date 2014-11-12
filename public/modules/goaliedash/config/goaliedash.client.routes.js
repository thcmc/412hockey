'use strict';

//Setting up route
angular.module('goaliedash').config(['$stateProvider',
	function($stateProvider) {
		// Goaliedash state routing
		$stateProvider.
		state('goaliedash', {
			url: '/goaliedash',
			templateUrl: 'modules/goaliedash/views/goaliedash.client.view.html'
		});
	}
]);