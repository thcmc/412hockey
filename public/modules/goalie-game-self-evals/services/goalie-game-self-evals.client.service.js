'use strict';

//Goalie game self evals service used to communicate Goalie game self evals REST endpoints
angular.module('goalie-game-self-evals').factory('GoalieGameSelfEvals', ['$resource',
	function($resource) {
		return $resource('goalie-game-self-evals/:goalieGameSelfEvalId', { goalieGameSelfEvalId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);