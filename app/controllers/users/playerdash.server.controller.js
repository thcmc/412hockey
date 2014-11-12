'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');

/**
 * Extend user's controller
 */
module.exports = _.extend(
	require('./users/users.authentication'),
	require('./users/users.authorization'),
	require('./users/users.password'),
	require('./users/users.profile')
);


/**
 * Player Dashboard authorization middleware
 */
exports.hasPlayerAuthorization = function(req, res, next) {
	if (_.indexOf(req.user.roles, 'player')<0) {
		return res.status(403).send({
			message: 'Access Denied.  Current User is not authorized as a Player or Administrator'
		});
	}
	next();
};