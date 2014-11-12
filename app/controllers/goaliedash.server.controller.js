'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	User = mongoose.model('User'),
	_ = require('lodash');



/**
 *  authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {



	if (req.user.roles === 'goalie') {
		return true;
	} else {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};