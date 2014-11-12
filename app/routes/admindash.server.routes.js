'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users');



module.exports = function(app) {
	app.route('/admindash')
		.get(users.requiresLogin, users.ensureAdmin);
};