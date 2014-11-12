'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	GoalieGameSelfEval = mongoose.model('GoalieGameSelfEval');

/**
 * Globals
 */
var user, goalieGameSelfEval;

/**
 * Unit tests
 */
describe('Goalie game self eval Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			goalieGameSelfEval = new GoalieGameSelfEval({
				name: 'Goalie game self eval Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return goalieGameSelfEval.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			goalieGameSelfEval.name = '';

			return goalieGameSelfEval.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		GoalieGameSelfEval.remove().exec();
		User.remove().exec();

		done();
	});
});