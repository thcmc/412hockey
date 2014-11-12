'use strict';

// Configuring the Articles module
angular.module('goalie-game-self-evals').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Goalie game self evals', 'goalie-game-self-evals', 'dropdown', '/goalie-game-self-evals(/create)?');
		Menus.addSubMenuItem('topbar', 'goalie-game-self-evals', 'List Goalie game self evals', 'goalie-game-self-evals');
		Menus.addSubMenuItem('topbar', 'goalie-game-self-evals', 'New Goalie game self eval', 'goalie-game-self-evals/create');
	}
]);