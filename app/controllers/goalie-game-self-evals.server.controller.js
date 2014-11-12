'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	GoalieGameSelfEval = mongoose.model('GoalieGameSelfEval'),
	_ = require('lodash');

/**
 * Create a Goalie game self eval
 */
exports.create = function(req, res) {
	var goalieGameSelfEval = new GoalieGameSelfEval(req.body);
	goalieGameSelfEval.user = req.user;

	goalieGameSelfEval.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(goalieGameSelfEval);
		}
	});
};

/**
 * Show the current Goalie game self eval
 */
exports.read = function(req, res) {
	res.jsonp(req.goalieGameSelfEval);
};

/**
 * Update a Goalie game self eval
 */
exports.update = function(req, res) {
	var goalieGameSelfEval = req.goalieGameSelfEval ;

	goalieGameSelfEval = _.extend(goalieGameSelfEval , req.body);

	goalieGameSelfEval.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(goalieGameSelfEval);
		}
	});
};

/**
 * Delete an Goalie game self eval
 */
exports.delete = function(req, res) {
	var goalieGameSelfEval = req.goalieGameSelfEval ;

	goalieGameSelfEval.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(goalieGameSelfEval);
		}
	});
};

/**
 * List of Goalie game self evals
 */
exports.list = function(req, res) { GoalieGameSelfEval.find().sort('-created').populate('user', 'displayName').exec(function(err, goalieGameSelfEvals) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(goalieGameSelfEvals);
		}
	});
};

/**
 * Goalie game self eval middleware
 */
exports.goalieGameSelfEvalByID = function(req, res, next, id) { GoalieGameSelfEval.findById(id).populate('user', 'displayName').exec(function(err, goalieGameSelfEval) {
		if (err) return next(err);
		if (! goalieGameSelfEval) return next(new Error('Failed to load Goalie game self eval ' + id));
		req.goalieGameSelfEval = goalieGameSelfEval ;
		next();
	});
};

/**
 * Goalie game self eval authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.goalieGameSelfEval.user.id !== req.user.id && _.indexOf(req.user.roles, 'admin')<0) {
		return res.status(403).send('User is not authorized');
	}
	next();
};