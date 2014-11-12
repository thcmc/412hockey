'use strict';

// Goalie game self evals controller
angular.module('goalie-game-self-evals').controller('GoalieGameSelfEvalsController', ['$scope', '$stateParams', '$location', 'Authentication', 'GoalieGameSelfEvals',
	function($scope, $stateParams, $location, Authentication, GoalieGameSelfEvals ) {
		$scope.authentication = Authentication;

		$scope.today = function() {
		    $scope.when = new Date();
		};
		 	$scope.today();

		$scope.clear = function () {
		    $scope.when = null;
		};

		$scope.open = function($event) {
		    $event.preventDefault();
		    $event.stopPropagation();

		    $scope.opened = true;
		};

		$scope.dateOptions = {
			formatYear: 'yy',
		    startingDay: 1
		};

		$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  		$scope.format = $scope.formats[0];

  		$scope.myrating = 0;
		$scope.max = 25;
		$scope.isReadonly = false;

		$scope.hoveringOver = function(value) {
			$scope.overStar = value;
			$scope.percent = 100 * (value / $scope.max);
		};
		$scope.hoveringOver1 = function(value) {
			$scope.overStar1 = value;
			$scope.percent1 = 100 * (value / $scope.max);
		};
		$scope.hoveringOver2 = function(value) {
			$scope.overStar2 = value;
			$scope.percent2 = 100 * (value / $scope.max);
		};
		$scope.hoveringOver3 = function(value) {
			$scope.overStar3 = value;
			$scope.percent3 = 100 * (value / $scope.max);
		};
		$scope.hoveringOver4 = function(value) {
			$scope.overStar4 = value;
			$scope.percent4 = 100 * (value / $scope.max);
		};
		$scope.hoveringOver5 = function(value) {
			$scope.overStar5 = value;
			$scope.percent5 = 100 * (value / $scope.max);
		};
		$scope.hoveringOver6 = function(value) {
			$scope.overStar6 = value;
			$scope.percent6 = 100 * (value / $scope.max);
		};
		$scope.hoveringOver7 = function(value) {
			$scope.overStar7 = value;
			$scope.percent7 = 100 * (value / $scope.max);
		};

		$scope.ratingStates = [
			{stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
			{stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
			{stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
			{stateOn: 'glyphicon-heart'},
			{stateOff: 'glyphicon-off'}
		];

  		

		// Create new Goalie game self eval
		$scope.create = function() {
			// Create new Goalie game self eval object
			var goalieGameSelfEval = new GoalieGameSelfEvals ({
				name		: 	this.name,
				opponent	: 	this.opponent,
				location	: 	this.location,
				when		: 	this.when,
				winloss		: 	this.winloss,
				myrating 	: 	this.myrating,
				gaa			: 	this.gaa,
				shots		: 	this.shots,
				ga1			: 	this.ga1,
				ga1rating 	: 	this.ga1rating,
				ga1fix		: 	this.ga1fix,
				ga2			: 	this.ga2,
				ga2rating 	: 	this.ga2rating,
				ga2fix		: 	this.ga2fix,
				ga3			: 	this.ga3,
				ga3rating 	: 	this.ga3rating,
				ga3fix		: 	this.ga3fix,
				ga4			: 	this.ga4,
				ga4rating 	: 	this.ga4rating,
				ga4fix		: 	this.ga4fix,
				ga5			: 	this.ga5,
				ga5rating 	: 	this.ga5rating,
				ga5fix		: 	this.ga5fix,
				ga6			: 	this.ga6,
				ga6rating 	: 	this.ga6rating,
				ga6fix		: 	this.ga6fix,
				ga7			: 	this.ga7,
				ga7rating 	: 	this.ga7rating,
				ga7fix		: 	this.ga7fix,
				toworkon 	: 	this.toworkon
			});

			// Redirect after save
			goalieGameSelfEval.$save(function(response) {
				$location.path('goalie-game-self-evals/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Goalie game self eval
		$scope.remove = function( goalieGameSelfEval ) {
			if ( goalieGameSelfEval ) { goalieGameSelfEval.$remove();

				for (var i in $scope.goalieGameSelfEvals ) {
					if ($scope.goalieGameSelfEvals [i] === goalieGameSelfEval ) {
						$scope.goalieGameSelfEvals.splice(i, 1);
					}
				}
			} else {
				$scope.goalieGameSelfEval.$remove(function() {
					$location.path('goalie-game-self-evals');
				});
			}
		};

		// Update existing Goalie game self eval
		$scope.update = function() {
			var goalieGameSelfEval = $scope.goalieGameSelfEval ;

			goalieGameSelfEval.$update(function() {
				$location.path('goalie-game-self-evals/' + goalieGameSelfEval._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Goalie game self evals
		$scope.find = function() {
			$scope.goalieGameSelfEvals = GoalieGameSelfEvals.query();
		};

		// Find existing Goalie game self eval
		$scope.findOne = function() {
			$scope.goalieGameSelfEval = GoalieGameSelfEvals.get({ 
				goalieGameSelfEvalId: $stateParams.goalieGameSelfEvalId
			});
		};
	}
]);