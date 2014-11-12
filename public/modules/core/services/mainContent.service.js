'use strict';

angular.module('core')
  .service('homepageService', function () {
    this.getContent = function () {
      return ([
        {
          mainTitle: '412-Hockey-Performance',
          whoWeAreTitle: 'Specializing in tools to improve Player Development and Team Communication.  Designed for Players, Coaches, Team Managers, and Scouts',
          whoWeAre: 'Finally, easy-to-use technology helping both players and organizers:  Performance Journal, Self Evaluations (Game/Practice), Nutrition Tracking, + More.',
          howItWorks: 'How It Works',
          overview: 'We want to improve hockey in two areas:  1)  technology for assisting with player development, and  2)  improved communication in amateur athletic organizations (coach to player, player to staff, staff to parents, manager to team, organization to all participants,  coach to scout, and more...). Performance is worth tracking and communication in amateur athletics is invaluable. We enable increases to player development,',
          step1:'Sign up as a Player, Coach, or Team Manager',
          step2:'',
          step3:'',
          mainFeatureDesc: 'Helpful Technology Solutions:   Performance Journal, Evaluations and Digital Feedback from Coaches, Nutrition Tracking, + More.',
          players: 'Players',
          coaches: 'Coaches',
          parents: 'Parents',
          playerFeatures: '',
          goalieFeatures: '',
          instructorFeatures: ''
        }
      ]);
    };




    this.getPlayerFeatures = function () {
      return (['Nutrition','Goal Planning','Evaluations', 'Online Journal']);
    };
    this.getPlayerMenuChoices = function () {
      return ([
        {name: 'Nutrition',         desc: '',       i: 'fa fa-star-o',   url: '#'},
        {name: 'Goals',             desc: '',       i: 'fa fa-star-o',   url: '#'},
        {name: 'Evaluations',       desc: '',       i: 'fa fa-star-o',   url: '#'}
      ]);
    };
    this.getPlayerChoicesNutrition = function () {
      return ([
        {name: 'Record Entry',         desc: 'Create a Food Journal Entry.',             i: 'fa fa-star-o',   url: '#'},
        {name: 'Nutritional Facts',    desc: 'View and search nutritional information.', i: 'fa fa-star-o',   url: '#'},
        {name: 'Track and View',       desc: 'View your food entry statistics.',         i: 'fa fa-star-o',   url: '#'}
      ]);
    };
    this.getPlayerChoicesGoals = function () {
      return ([
        {name: 'Season Goals',        desc: 'Create or edit your season goals.',                 i: 'fa fa-star-o',   url: '#'},
        {name: 'Mid-Season Goals - review',   desc: 'Prepare for the mid-season review with your coach.',i: 'fa fa-star-o',   url: '#'},
        {name: 'End-of-Season Goals - review',desc: 'Prepare for end-of-season review with your coach.',i: 'fa fa-star-o',   url: '#'}
      ]);
    };
    this.getPlayerChoicesEvals = function () {
      return ([
        {name: 'Practice Goals',         desc: 'Record and remember what to practice on.',             i: 'fa fa-star-o',   url: '#'},
        {name: 'Journal Entry - Practice ',    desc: 'Record positives, negatives, and other information from a practice.', i: 'fa fa-star-o',   url: '#'},
        {name: 'Journal Entry - Game',  desc: 'Record Game Journal Entry (private to you)',         i: 'fa fa-star-o',   url: '#'},
        {name: 'Game Evaluation',       desc: 'Rate Your Game Performance (for coaching staff)',         i: 'fa fa-star-o',   url: '#'},
        {name: 'Mid-Season Evaluation',       desc: 'Record Game Journal Entry',         i: 'fa fa-star-o',   url: '#'}
      ]);
    };

    this.getCoachFeatures = function () {
      return ([
        {
          f1: 'Digitally Evaluate Performance',
          f2: 'Leave Feedback',
          f3: 'Record and Reference Game Notes',
          f4: 'Communicate seamlessly Throughout an Organization'
        }
      ]);
    };
    this.getCoachMenuChoices = function () {
      return ([
        {name: 'Nutrition',         desc: '',       i: 'fa fa-star-o',   url: '#'},
        {name: 'Goals',             desc: '',       i: 'fa fa-star-o',   url: '#'},
        {name: 'Evaluations',       desc: '',       i: 'fa fa-star-o',   url: '#'}
      ]);
    };
    // this.getParentFeatures = function () {
    //   return (['1','2','3','4','5']);
    // };
    // this.getParentMenuChoices = function () {
    //   return ([
    //     {name: 'Nutrition',         desc: '',       i: 'fa fa-star-o',   url: '#'},
    //     {name: 'Goals',             desc: '',       i: 'fa fa-star-o',   url: '#'},
    //     {name: 'Evaluations',       desc: '',       i: 'fa fa-star-o',   url: '#'}
    //   ]);
    // };
    this.getGoalieFeatures = function () {
      return (['1','2','3','4']);
    };
    this.getGoalieMenuChoices = function () {
      return ([
        {name: 'Journal',           desc: '',       i: 'fa fa-star-o',   url: '/goaliedash'},
        {name: 'Goals',             desc: '',       i: 'fa fa-star-o',   url: '/goaliedash'},
        {name: 'Evaluations',       desc: '',       i: 'fa fa-star-o',   url: '/goaliedash'},
        {name: 'Coach Feedback',    desc: '',       i: 'fa fa-star-o',   url: '/goaliedash'},
        {name: 'Submit New Rating', desc: '',       i: 'fa fa-star-o',   url: '/goaliedash'}
      ]);
    };
    // this.getInstructorFeatures = function () {
    //   return (['1','2','3','4']);
    // };
    // this.getInstructorMenuChoices = function () {
    //   return ([
    //     {name: 'Nutrition',         desc: '',       i: 'fa fa-star-o',   url: '#'},
    //     {name: 'Goals',             desc: '',       i: 'fa fa-star-o',   url: '#'},
    //     {name: 'Evaluations',       desc: '',       i: 'fa fa-star-o',   url: '#'}
    //   ]);
    // };
  });




    