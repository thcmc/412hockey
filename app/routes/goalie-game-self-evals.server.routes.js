'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var goalieGameSelfEvals = require('../../app/controllers/goalie-game-self-evals');

	// Goalie game self evals Routes
	app.route('/goalie-game-self-evals')
		.get(goalieGameSelfEvals.list)
		.post(users.requiresLogin, goalieGameSelfEvals.create);

	app.route('/goalie-game-self-evals/:goalieGameSelfEvalId')
		.get(goalieGameSelfEvals.read)
		.put(users.requiresLogin, goalieGameSelfEvals.hasAuthorization, goalieGameSelfEvals.update)
		.delete(users.requiresLogin, goalieGameSelfEvals.hasAuthorization, goalieGameSelfEvals.delete);

	// Finish by binding the Goalie game self eval middleware
	app.param('goalieGameSelfEvalId', goalieGameSelfEvals.goalieGameSelfEvalByID);
};