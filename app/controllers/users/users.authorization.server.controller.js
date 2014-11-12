'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	mongoose = require('mongoose'),
	User = mongoose.model('User');

/**
 * User middleware
 */
exports.userByID = function(req, res, next, id) {
	User.findOne({
		_id: id
	}).exec(function(err, user) {
		if (err) return next(err);
		if (!user) return next(new Error('Failed to load User ' + id));
		req.profile = user;
		next();
	});
};

/**
 * Require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(401).send({
			message: 'User is not logged in'
		});
	}

	next();
};

/**
 * User authorizations routing middleware
 */
exports.hasAuthorization = function(roles) {
	var _this = this;

	return function(req, res, next) {
		_this.requiresLogin(req, res, function() {
			if (_.intersection(req.user.roles, roles).length) {
				return next();
			} else {
				return res.status(403).send({
					message: 'User is not authorized'
				});
			}
		});
	};
};

// exports.ensureAdmin = function(roles) {
// 	var _this = this;

// 	return function(req, res, next) {
// 		_this.requiresLogin(req, res, function() {
// 			if (req.user && req.user.role === 'admin') {
// 				console.log('This user has been approved as the admin.');
// 				return next();
// 			} else {
// 				res.redirect('http://google.com');

// 			}
// 			next ();
// 		});
// 	};
// };


exports.ensureAdmin = function(req, res, next) {
	if (req.user && req.user.role === 'admin') {
		console.log('This user has been approved as the admin.');
		return next();
	} else {
		res.redirect('http://www.google.com');
	}
	next();
};

exports.ensureGoalie = function(req, res, next) {
	if (req.user && req.user.role === 'goalie') {
		console.log('This user has been approved as the goalie.');
		return next();
	} else {
		res.redirect('http://www.google.com');
	}
	next();
};
exports.ensurePlayer = function(req, res, next) {
	if (req.user && req.user.role === 'player') {
		console.log('This user has been approved as the player.');
		return next();
	} else {
		res.redirect('http://www.google.com');
	}
	next();
};
exports.ensureManager = function(req, res, next) {
	if (req.user && req.user.role === 'manager') {
		console.log('This user has been approved as the manager.');
		return next();
	} else {
		res.redirect('http://www.google.com');
	}
	next();
};
exports.ensureCoach = function(req, res, next) {
	if (req.user && req.user.role === 'coach') {
		console.log('This user has been approved as the coach.');
		return next();
	} else {
		res.redirect('http://www.google.com');
	}
	next();
};














