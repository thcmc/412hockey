'use strict';

(function() {
	// Goalie game self evals Controller Spec
	describe('Goalie game self evals Controller Tests', function() {
		// Initialize global variables
		var GoalieGameSelfEvalsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Goalie game self evals controller.
			GoalieGameSelfEvalsController = $controller('GoalieGameSelfEvalsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Goalie game self eval object fetched from XHR', inject(function(GoalieGameSelfEvals) {
			// Create sample Goalie game self eval using the Goalie game self evals service
			var sampleGoalieGameSelfEval = new GoalieGameSelfEvals({
				name: 'New Goalie game self eval'
			});

			// Create a sample Goalie game self evals array that includes the new Goalie game self eval
			var sampleGoalieGameSelfEvals = [sampleGoalieGameSelfEval];

			// Set GET response
			$httpBackend.expectGET('goalie-game-self-evals').respond(sampleGoalieGameSelfEvals);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.goalieGameSelfEvals).toEqualData(sampleGoalieGameSelfEvals);
		}));

		it('$scope.findOne() should create an array with one Goalie game self eval object fetched from XHR using a goalieGameSelfEvalId URL parameter', inject(function(GoalieGameSelfEvals) {
			// Define a sample Goalie game self eval object
			var sampleGoalieGameSelfEval = new GoalieGameSelfEvals({
				name: 'New Goalie game self eval'
			});

			// Set the URL parameter
			$stateParams.goalieGameSelfEvalId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/goalie-game-self-evals\/([0-9a-fA-F]{24})$/).respond(sampleGoalieGameSelfEval);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.goalieGameSelfEval).toEqualData(sampleGoalieGameSelfEval);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(GoalieGameSelfEvals) {
			// Create a sample Goalie game self eval object
			var sampleGoalieGameSelfEvalPostData = new GoalieGameSelfEvals({
				name: 'New Goalie game self eval'
			});

			// Create a sample Goalie game self eval response
			var sampleGoalieGameSelfEvalResponse = new GoalieGameSelfEvals({
				_id: '525cf20451979dea2c000001',
				name: 'New Goalie game self eval'
			});

			// Fixture mock form input values
			scope.name = 'New Goalie game self eval';

			// Set POST response
			$httpBackend.expectPOST('goalie-game-self-evals', sampleGoalieGameSelfEvalPostData).respond(sampleGoalieGameSelfEvalResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Goalie game self eval was created
			expect($location.path()).toBe('/goalie-game-self-evals/' + sampleGoalieGameSelfEvalResponse._id);
		}));

		it('$scope.update() should update a valid Goalie game self eval', inject(function(GoalieGameSelfEvals) {
			// Define a sample Goalie game self eval put data
			var sampleGoalieGameSelfEvalPutData = new GoalieGameSelfEvals({
				_id: '525cf20451979dea2c000001',
				name: 'New Goalie game self eval'
			});

			// Mock Goalie game self eval in scope
			scope.goalieGameSelfEval = sampleGoalieGameSelfEvalPutData;

			// Set PUT response
			$httpBackend.expectPUT(/goalie-game-self-evals\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/goalie-game-self-evals/' + sampleGoalieGameSelfEvalPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid goalieGameSelfEvalId and remove the Goalie game self eval from the scope', inject(function(GoalieGameSelfEvals) {
			// Create new Goalie game self eval object
			var sampleGoalieGameSelfEval = new GoalieGameSelfEvals({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Goalie game self evals array and include the Goalie game self eval
			scope.goalieGameSelfEvals = [sampleGoalieGameSelfEval];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/goalie-game-self-evals\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleGoalieGameSelfEval);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.goalieGameSelfEvals.length).toBe(0);
		}));
	});
}());