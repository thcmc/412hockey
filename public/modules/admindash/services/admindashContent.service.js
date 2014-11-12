'use strict';

angular.module('core')
  .service('adminpageService', function () {
    this.getPlayerFeatures = function () {
      return (['Nutrition','Goal Planning','Evaluations', 'Online Journal']);
    };
    this.getContent = function () {
      return ([
        {
          pageTitle: 'Admin Dashboard',
          sbnav1: 'Overview', sbnav1url: '/',
          sbnav2: 'Analytics', sbnav2url: '#',
          sbnav3: 'Reports', sbnav3url: '#',
          sbnav4: 'Export', sbnav4url: '#',
          sbnav5: '', sbnav5url: '#',
          sbnav6: '', sbnav6url: '#',
          secATitle: 'Label A', secADesc: 'lable A description',
          secBTitle: 'Label B', secBDesc: ' label description here ..  al.. a .. . a.d .d.fdfdjfldjflk jdljlk jadlkfj ',
          secCTitle: 'Label C', secCDesc: ' label description here ..  al.. a .. . a.d .d.fdfdjfldjflk jdljlk jadlkfj ',
          secDTitle: 'Label D', secDDesc: ' label description here ..  al.. a .. . a.d .d.fdfdjfldjflk jdljlk jadlkfj '
        }
      ]);
    };
  });  
  this.getAdminMenuChoices = function () {
      return ([
        {name: 'Record Entry',         desc: 'Create a Food Journal Entry.',             i: 'fa fa-star-o',   url: '#'},
        {name: 'Nutritional Facts',    desc: 'View and search nutritional information.', i: 'fa fa-star-o',   url: '#'},
        {name: 'Track and View',       desc: 'View your food entry statistics.',         i: 'fa fa-star-o',   url: '#'}
      ]);
    };


    