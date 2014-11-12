'use strict';

//Setting up route
angular.module('goalie-game-self-evals').config(['$stateProvider',
	function($stateProvider) {
		// Goalie game self evals state routing
		$stateProvider.
		state('listGoalieGameSelfEvals', {
			url: '/goalie-game-self-evals',
			templateUrl: 'modules/goalie-game-self-evals/views/list-goalie-game-self-evals.client.view.html'
		}).
		state('createGoalieGameSelfEval', {
			url: '/goalie-game-self-evals/create',
			templateUrl: 'modules/goalie-game-self-evals/views/create-goalie-game-self-eval.client.view.html'
		}).
		state('viewGoalieGameSelfEval', {
			url: '/goalie-game-self-evals/:goalieGameSelfEvalId',
			templateUrl: 'modules/goalie-game-self-evals/views/view-goalie-game-self-eval.client.view.html'
		}).
		state('editGoalieGameSelfEval', {
			url: '/goalie-game-self-evals/:goalieGameSelfEvalId/edit',
			templateUrl: 'modules/goalie-game-self-evals/views/edit-goalie-game-self-eval.client.view.html'
		});
	}
]);