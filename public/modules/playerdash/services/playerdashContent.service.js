'use strict';

angular.module('core')
  .service('playerpageService', function () {
    this.getContent = function () {
      return ([
        {
          pageTitle: 'Player Dashboard',
          sbnav1: '', sbnav1url: '/',
          sbnav2: '', sbnav2url: '#',
          sbnav3: '', sbnav3url: '#',
          sbnav4: '', sbnav4url: '#',
          sbnav5: '', sbnav5url: '#',
          sbnav6: '', sbnav6url: '#',
          secATitle: '', secADesc: '',
          secBTitle: '', secBDesc: '',
          secCTitle: '', secCDesc: '',
          secDTitle: '', secDDesc: ''
        }
      ]);
    };
  }); 
    this.getPlayerFeatures = function () {
      return (['Nutrition','Goal Planning','Evaluations', 'Online Journal']);
    };
    this.getPlayerMenu = function () {
      return ([
        {name: 'Nutrition',         desc: '',       i: 'fa fa-star-o',   url: '#'},
        {name: 'Goals',             desc: '',       i: 'fa fa-star-o',   url: '#'},
        {name: 'Evaluations',       desc: '',       i: 'fa fa-star-o',   url: '#'}
      ]);
    };
    this.getPlayerNutrition = function () {
      return ([
        {name: 'Record Entry',         desc: 'Create a Food Journal Entry.',             i: 'fa fa-star-o',   url: '#'},
        {name: 'Nutritional Facts',    desc: 'View and search nutritional information.', i: 'fa fa-star-o',   url: '#'},
        {name: 'Track and View',       desc: 'View your food entry statistics.',         i: 'fa fa-star-o',   url: '#'}
      ]);
    };
    this.getPlayerGoals = function () {
      return ([
        {name: 'Season Goals',        desc: 'Create or edit your season goals.',                 i: 'fa fa-star-o',   url: '#'},
        {name: 'Mid-Season Goals - review',   desc: 'Prepare for the mid-season review with your coach.',i: 'fa fa-star-o',   url: '#'},
        {name: 'End-of-Season Goals - review',desc: 'Prepare for end-of-season review with your coach.',i: 'fa fa-star-o',   url: '#'}
      ]);
    };
    this.getPlayerEvals = function () {
      return ([
        {name: 'Practice Goals',         desc: 'Record and remember what to practice on.',             i: 'fa fa-star-o',   url: '#'},
        {name: 'Journal Entry - Practice ',    desc: 'Record positives, negatives, and other information from a practice.', i: 'fa fa-star-o',   url: '#'},
        {name: 'Journal Entry - Game',  desc: 'Record Game Journal Entry (private to you)',         i: 'fa fa-star-o',   url: '#'},
        {name: 'Game Evaluation',       desc: 'Rate Your Game Performance (for coaching staff)',         i: 'fa fa-star-o',   url: '#'},
        {name: 'Mid-Season Evaluation',       desc: 'Record Game Journal Entry',         i: 'fa fa-star-o',   url: '#'}
      ]);
    };
  });




    