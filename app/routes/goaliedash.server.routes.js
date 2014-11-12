'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
	goaliedash = require('../../app/controllers/goaliedash');

module.exports = function(app) {
	
	app.route('/goaliedash')
		.get(users.requiresLogin, users.hasAuthorization);
};