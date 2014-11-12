'use strict';

//Setting up route
angular.module('admindash').config(['$stateProvider',
	function($stateProvider) {
		// Admindash state routing
		$stateProvider.
		state('admindash', {
			url: '/admindash',
			templateUrl: 'modules/admindash/views/admindash.client.view.html'
		});
	}
]);