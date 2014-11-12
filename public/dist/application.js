'use strict';
// Init the application configuration module for AngularJS application
var ApplicationConfiguration = function () {
    // Init module configuration options
    var applicationModuleName = '412hockey';
    var applicationModuleVendorDependencies = [
        'ngResource',
        'ngCookies',
        'ngAnimate',
        'ngTouch',
        'ngSanitize',
        'ui.router',
        'ui.bootstrap',
        'ui.utils'
      ];
    // Add a new vertical module
    var registerModule = function (moduleName, dependencies) {
      // Create angular module
      angular.module(moduleName, dependencies || []);
      // Add the module to the AngularJS configuration file
      angular.module(applicationModuleName).requires.push(moduleName);
    };
    return {
      applicationModuleName: applicationModuleName,
      applicationModuleVendorDependencies: applicationModuleVendorDependencies,
      registerModule: registerModule
    };
  }();'use strict';
//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);
// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config([
  '$locationProvider',
  function ($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);
//Then define the init function for starting up the application
angular.element(document).ready(function () {
  //Fixing facebook bug with redirect
  if (window.location.hash === '#_=_')
    window.location.hash = '#!';
  //Then init the app
  angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('admindash');'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('articles');'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('goalie-game-self-evals');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('goaliedash');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('playerdash');'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');'use strict';
//Setting up route
angular.module('admindash').config([
  '$stateProvider',
  function ($stateProvider) {
    // Admindash state routing
    $stateProvider.state('admindash', {
      url: '/admindash',
      templateUrl: 'modules/admindash/views/admindash.client.view.html'
    });
  }
]);'use strict';
angular.module('admindash').controller('AdmindashController', [
  '$scope',
  function ($scope) {
  }
]);'use strict';
// Configuring the Articles module
angular.module('articles').run([
  'Menus',
  function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', 'Articles', 'articles', 'dropdown', '/articles(/create)?');
    Menus.addSubMenuItem('topbar', 'articles', 'List Articles', 'articles');
    Menus.addSubMenuItem('topbar', 'articles', 'New Article', 'articles/create');
  }
]);'use strict';
// Setting up route
angular.module('articles').config([
  '$stateProvider',
  function ($stateProvider) {
    // Articles state routing
    $stateProvider.state('listArticles', {
      url: '/articles',
      templateUrl: 'modules/articles/views/list-articles.client.view.html'
    }).state('createArticle', {
      url: '/articles/create',
      templateUrl: 'modules/articles/views/create-article.client.view.html'
    }).state('viewArticle', {
      url: '/articles/:articleId',
      templateUrl: 'modules/articles/views/view-article.client.view.html'
    }).state('editArticle', {
      url: '/articles/:articleId/edit',
      templateUrl: 'modules/articles/views/edit-article.client.view.html'
    });
  }
]);'use strict';
angular.module('articles').controller('ArticlesController', [
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Articles',
  function ($scope, $stateParams, $location, Authentication, Articles) {
    $scope.authentication = Authentication;
    $scope.create = function () {
      var article = new Articles({
          title: this.title,
          content: this.content
        });
      article.$save(function (response) {
        $location.path('articles/' + response._id);
        $scope.title = '';
        $scope.content = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    $scope.remove = function (article) {
      if (article) {
        article.$remove();
        for (var i in $scope.articles) {
          if ($scope.articles[i] === article) {
            $scope.articles.splice(i, 1);
          }
        }
      } else {
        $scope.article.$remove(function () {
          $location.path('articles');
        });
      }
    };
    $scope.update = function () {
      var article = $scope.article;
      article.$update(function () {
        $location.path('articles/' + article._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    $scope.find = function () {
      $scope.articles = Articles.query();
    };
    $scope.findOne = function () {
      $scope.article = Articles.get({ articleId: $stateParams.articleId });
    };
  }
]);'use strict';
//Articles service used for communicating with the articles REST endpoints
angular.module('articles').factory('Articles', [
  '$resource',
  function ($resource) {
    return $resource('articles/:articleId', { articleId: '@_id' }, { update: { method: 'PUT' } });
  }
]);'use strict';
// Setting up route
angular.module('core').config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    // Redirect to home view when route not found
    $urlRouterProvider.otherwise('/');
    // Home state routing
    $stateProvider.state('home', {
      url: '/',
      templateUrl: 'modules/core/views/h.client.view.html'
    });
  }
]);'use strict';
angular.module('core').controller('HeaderController', [
  '$scope',
  'Authentication',
  'Menus',
  function ($scope, Authentication, Menus) {
    $scope.authentication = Authentication;
    $scope.isCollapsed = false;
    $scope.menu = Menus.getMenu('topbar');
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };
    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });
  }
]);'use strict';
angular.module('core').controller('HomeController', [
  '$scope',
  'Authentication',
  'homepageService',
  function ($scope, Authentication, homepageService) {
    $scope.authentication = Authentication;
    // var code = document.getElementById('code');
    var demo = document.getElementById('demo');
    var svg = document.getElementsByTagName('svg')[0];
    // Convert the SVG node to HTML.
    var div = document.createElement('div');
    div.appendChild(svg.cloneNode(true));
    // Encode the SVG as base64
    var b64 = 'data:image/svg+xml;base64,' + window.btoa(div.innerHTML);
    var url = 'url("' + b64 + '")';
    // code.innerHTML = 'Base64 CSS (for cross-browser compatibility)\n\nbackground-image: ' + url + ';';
    demo.style.backgroundImage = url;
    $scope.homepageContent = {};
    try {
      $scope.homepageContent = homepageService.getContent();
    } catch (error) {
      console.error(error);
    }
    //
    $scope.playerContent = {};
    try {
      $scope.playerContent = homepageService.getPlayerFeatures();
    } catch (error) {
      console.error(error);
    }
    $scope.playerChoices = {};
    try {
      $scope.playerChoices = homepageService.getPlayerMenuChoices();
    } catch (error) {
      console.error(error);
    }
    $scope.playerFoods = {};
    try {
      $scope.playerFoods = homepageService.getPlayerChoicesNutrition();
    } catch (error) {
      console.error(error);
    }
    $scope.playerGoals = {};
    try {
      $scope.playerGoals = homepageService.getPlayerChoicesGoals();
    } catch (error) {
      console.error(error);
    }
    $scope.playerEvals = {};
    try {
      $scope.playerEvals = homepageService.getPlayerChoicesEvals();
    } catch (error) {
      console.error(error);
    }
    //
    $scope.coachContent = {};
    try {
      $scope.coachContent = homepageService.getCoachFeatures();
    } catch (error) {
      console.error(error);
    }
    $scope.coachChoices = {};
    try {
      $scope.coachChoices = homepageService.getCoachMenuChoices();
    } catch (error) {
      console.error(error);
    }
    //
    $scope.parentContent = {};
    try {
      $scope.parentContent = homepageService.getParentFeatures();
    } catch (error) {
      console.error(error);
    }
    $scope.parentChoices = {};
    try {
      $scope.parentChoices = homepageService.getParentMenuChoices();
    } catch (error) {
      console.error(error);
    }
    //
    $scope.goalieContent = {};
    try {
      $scope.goalieContent = homepageService.getGoalieFeatures();
    } catch (error) {
      console.error(error);
    }
    $scope.goalieChoices = {};
    try {
      $scope.goalieChoices = homepageService.getGoalieMenuChoices();
    } catch (error) {
      console.error(error);
    }
    //
    $scope.instructorContent = {};
    try {
      $scope.instructorContent = homepageService.getInstructorFeatures();
    } catch (error) {
      console.error(error);
    }
    $scope.instructorChoices = {};
    try {
      $scope.instructorChoices = homepageService.getInstructorMenuChoices();
    } catch (error) {
      console.error(error);
    }
  }
]);'use strict';
angular.module('core').service('homepageService', function () {
  this.getContent = function () {
    return [{
        mainTitle: '412Hockey',
        whoWeAreTitle: 'Specializing in Player Development and Team Communication tools for Players, Coaches, Team Managers',
        whoWeAre: 'Hockey finally has the technology you need:  Performance Journal, Self Evaluations (Game/Practice), Nutrition Tracking, + More.',
        mainFeatureDescTitle: 'Hockey is Unique',
        mainFeatureDesc: 'Helpful Technology Solutions:   Performance Journal, Evaluations and Digital Feedback from Coaches, Nutrition Tracking, + More.',
        players: 'Players',
        coaches: 'Coaches',
        parents: 'Parents',
        playerFeatures: '',
        goalieFeatures: '',
        instructorFeatures: ''
      }];
  };
  this.getPlayerFeatures = function () {
    return [
      'Nutrition',
      'Goal Planning',
      'Evaluations',
      'Online Journal'
    ];
  };
  this.getPlayerMenuChoices = function () {
    return [
      {
        name: 'Nutrition',
        desc: '',
        i: 'fa fa-star-o',
        url: '#'
      },
      {
        name: 'Goals',
        desc: '',
        i: 'fa fa-star-o',
        url: '#'
      },
      {
        name: 'Evaluations',
        desc: '',
        i: 'fa fa-star-o',
        url: '#'
      }
    ];
  };
  this.getPlayerChoicesNutrition = function () {
    return [
      {
        name: 'Record Entry',
        desc: 'Create a Food Journal Entry.',
        i: 'fa fa-star-o',
        url: '#'
      },
      {
        name: 'Nutritional Facts',
        desc: 'View and search nutritional information.',
        i: 'fa fa-star-o',
        url: '#'
      },
      {
        name: 'Track and View',
        desc: 'View your food entry statistics.',
        i: 'fa fa-star-o',
        url: '#'
      }
    ];
  };
  this.getPlayerChoicesGoals = function () {
    return [
      {
        name: 'Season Goals',
        desc: 'Create or edit your season goals.',
        i: 'fa fa-star-o',
        url: '#'
      },
      {
        name: 'Mid-Season Goals - review',
        desc: 'Prepare for the mid-season review with your coach.',
        i: 'fa fa-star-o',
        url: '#'
      },
      {
        name: 'End-of-Season Goals - review',
        desc: 'Prepare for end-of-season review with your coach.',
        i: 'fa fa-star-o',
        url: '#'
      }
    ];
  };
  this.getPlayerChoicesEvals = function () {
    return [
      {
        name: 'Practice Goals',
        desc: 'Record and remember what to practice on.',
        i: 'fa fa-star-o',
        url: '#'
      },
      {
        name: 'Journal Entry - Practice ',
        desc: 'Record positives, negatives, and other information from a practice.',
        i: 'fa fa-star-o',
        url: '#'
      },
      {
        name: 'Journal Entry - Game',
        desc: 'Record Game Journal Entry (private to you)',
        i: 'fa fa-star-o',
        url: '#'
      },
      {
        name: 'Game Evaluation',
        desc: 'Rate Your Game Performance (for coaching staff)',
        i: 'fa fa-star-o',
        url: '#'
      },
      {
        name: 'Mid-Season Evaluation',
        desc: 'Record Game Journal Entry',
        i: 'fa fa-star-o',
        url: '#'
      }
    ];
  };
  this.getCoachFeatures = function () {
    return [{
        f1: 'Digitally Evaluate Performance',
        f2: 'Leave Feedback',
        f3: 'Record and Reference Game Notes',
        f4: 'Communicate seamlessly Throughout an Organization'
      }];
  };
  this.getCoachMenuChoices = function () {
    return [
      {
        name: 'Nutrition',
        desc: '',
        i: 'fa fa-star-o',
        url: '#'
      },
      {
        name: 'Goals',
        desc: '',
        i: 'fa fa-star-o',
        url: '#'
      },
      {
        name: 'Evaluations',
        desc: '',
        i: 'fa fa-star-o',
        url: '#'
      }
    ];
  };
  this.getParentFeatures = function () {
    return [
      '1',
      '2',
      '3',
      '4',
      '5'
    ];
  };
  this.getParentMenuChoices = function () {
    return [
      {
        name: 'Nutrition',
        desc: '',
        i: 'fa fa-star-o',
        url: '#'
      },
      {
        name: 'Goals',
        desc: '',
        i: 'fa fa-star-o',
        url: '#'
      },
      {
        name: 'Evaluations',
        desc: '',
        i: 'fa fa-star-o',
        url: '#'
      }
    ];
  };
  this.getGoalieFeatures = function () {
    return [
      '1',
      '2',
      '3',
      '4'
    ];
  };
  this.getGoalieMenuChoices = function () {
    return [
      {
        name: 'Journal',
        desc: '',
        i: 'fa fa-star-o',
        url: '/goaliedash'
      },
      {
        name: 'Goals',
        desc: '',
        i: 'fa fa-star-o',
        url: '/goaliedash'
      },
      {
        name: 'Evaluations',
        desc: '',
        i: 'fa fa-star-o',
        url: '/goaliedash'
      },
      {
        name: 'Coach Feedback',
        desc: '',
        i: 'fa fa-star-o',
        url: '/goaliedash'
      },
      {
        name: 'Submit New Rating',
        desc: '',
        i: 'fa fa-star-o',
        url: '/goaliedash'
      }
    ];
  };
  this.getInstructorFeatures = function () {
    return [
      '1',
      '2',
      '3',
      '4'
    ];
  };
  this.getInstructorMenuChoices = function () {
    return [
      {
        name: 'Nutrition',
        desc: '',
        i: 'fa fa-star-o',
        url: '#'
      },
      {
        name: 'Goals',
        desc: '',
        i: 'fa fa-star-o',
        url: '#'
      },
      {
        name: 'Evaluations',
        desc: '',
        i: 'fa fa-star-o',
        url: '#'
      }
    ];
  };
});'use strict';
//Menu service used for managing  menus
angular.module('core').service('Menus', [function () {
    // Define a set of default roles
    this.defaultRoles = ['*'];
    // Define the menus object
    this.menus = {};
    // A private function for rendering decision 
    var shouldRender = function (user) {
      if (user) {
        if (!!~this.roles.indexOf('*')) {
          return true;
        } else {
          for (var userRoleIndex in user.roles) {
            for (var roleIndex in this.roles) {
              if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
                return true;
              }
            }
          }
        }
      } else {
        return this.isPublic;
      }
      return false;
    };
    // A private function for rendering decision 
    var shouldRenderAdmin = function (user) {
      if (user) {
        if (!!~this.roles.indexOf('admin')) {
          return true;
        } else {
          for (var userRoleIndex in user.roles) {
            for (var roleIndex in this.roles) {
              if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
                return true;
              }
            }
          }
        }
      } else {
        return this.isPublic;
      }
      return false;
    };
    // Validate menu existance
    this.validateMenuExistance = function (menuId) {
      if (menuId && menuId.length) {
        if (this.menus[menuId]) {
          return true;
        } else {
          throw new Error('Menu does not exists');
        }
      } else {
        throw new Error('MenuId was not provided');
      }
      return false;
    };
    // Get the menu object by menu id
    this.getMenu = function (menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Return the menu object
      return this.menus[menuId];
    };
    // Add new menu object by menu id
    this.addMenu = function (menuId, isPublic, roles) {
      // Create the new menu
      this.menus[menuId] = {
        isPublic: isPublic || false,
        roles: roles || this.defaultRoles,
        items: [],
        shouldRender: shouldRender
      };
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeMenu = function (menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Return the menu object
      delete this.menus[menuId];
    };
    // Add menu item object
    this.addMenuItem = function (menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Push new menu item
      this.menus[menuId].items.push({
        title: menuItemTitle,
        link: menuItemURL,
        menuItemType: menuItemType || 'item',
        menuItemClass: menuItemType,
        uiRoute: menuItemUIRoute || '/' + menuItemURL,
        isPublic: isPublic === null || typeof isPublic === 'undefined' ? this.menus[menuId].isPublic : isPublic,
        roles: roles === null || typeof roles === 'undefined' ? this.menus[menuId].roles : roles,
        position: position || 0,
        items: [],
        shouldRender: shouldRender
      });
      // Return the menu object
      return this.menus[menuId];
    };
    // Add submenu item object
    this.addSubMenuItem = function (menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
          // Push new submenu item
          this.menus[menuId].items[itemIndex].items.push({
            title: menuItemTitle,
            link: menuItemURL,
            uiRoute: menuItemUIRoute || '/' + menuItemURL,
            isPublic: isPublic === null || typeof isPublic === 'undefined' ? this.menus[menuId].items[itemIndex].isPublic : isPublic,
            roles: roles === null || typeof roles === 'undefined' ? this.menus[menuId].items[itemIndex].roles : roles,
            position: position || 0,
            shouldRender: shouldRender
          });
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeMenuItem = function (menuId, menuItemURL) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
          this.menus[menuId].items.splice(itemIndex, 1);
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeSubMenuItem = function (menuId, submenuItemURL) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
          if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
            this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
          }
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    //Adding the topbar menu
    this.addMenu('topbar');
  }]);'use strict';
// Configuring the Articles module
angular.module('goalie-game-self-evals').run([
  'Menus',
  function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', 'Goalie game self evals', 'goalie-game-self-evals', 'dropdown', '/goalie-game-self-evals(/create)?');
    Menus.addSubMenuItem('topbar', 'goalie-game-self-evals', 'List Goalie game self evals', 'goalie-game-self-evals');
    Menus.addSubMenuItem('topbar', 'goalie-game-self-evals', 'New Goalie game self eval', 'goalie-game-self-evals/create');
  }
]);'use strict';
//Setting up route
angular.module('goalie-game-self-evals').config([
  '$stateProvider',
  function ($stateProvider) {
    // Goalie game self evals state routing
    $stateProvider.state('listGoalieGameSelfEvals', {
      url: '/goalie-game-self-evals',
      templateUrl: 'modules/goalie-game-self-evals/views/list-goalie-game-self-evals.client.view.html'
    }).state('createGoalieGameSelfEval', {
      url: '/goalie-game-self-evals/create',
      templateUrl: 'modules/goalie-game-self-evals/views/create-goalie-game-self-eval.client.view.html'
    }).state('viewGoalieGameSelfEval', {
      url: '/goalie-game-self-evals/:goalieGameSelfEvalId',
      templateUrl: 'modules/goalie-game-self-evals/views/view-goalie-game-self-eval.client.view.html'
    }).state('editGoalieGameSelfEval', {
      url: '/goalie-game-self-evals/:goalieGameSelfEvalId/edit',
      templateUrl: 'modules/goalie-game-self-evals/views/edit-goalie-game-self-eval.client.view.html'
    });
  }
]);'use strict';
// Goalie game self evals controller
angular.module('goalie-game-self-evals').controller('GoalieGameSelfEvalsController', [
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'GoalieGameSelfEvals',
  function ($scope, $stateParams, $location, Authentication, GoalieGameSelfEvals) {
    $scope.authentication = Authentication;
    $scope.today = function () {
      $scope.when = new Date();
    };
    $scope.today();
    $scope.clear = function () {
      $scope.when = null;
    };
    $scope.open = function ($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };
    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };
    $scope.formats = [
      'dd-MMMM-yyyy',
      'yyyy/MM/dd',
      'dd.MM.yyyy',
      'shortDate'
    ];
    $scope.format = $scope.formats[0];
    $scope.myrating = 0;
    $scope.max = 25;
    $scope.isReadonly = false;
    $scope.hoveringOver = function (value) {
      $scope.overStar = value;
      $scope.percent = 100 * (value / $scope.max);
    };
    $scope.hoveringOver1 = function (value) {
      $scope.overStar1 = value;
      $scope.percent1 = 100 * (value / $scope.max);
    };
    $scope.hoveringOver2 = function (value) {
      $scope.overStar2 = value;
      $scope.percent2 = 100 * (value / $scope.max);
    };
    $scope.hoveringOver3 = function (value) {
      $scope.overStar3 = value;
      $scope.percent3 = 100 * (value / $scope.max);
    };
    $scope.hoveringOver4 = function (value) {
      $scope.overStar4 = value;
      $scope.percent4 = 100 * (value / $scope.max);
    };
    $scope.hoveringOver5 = function (value) {
      $scope.overStar5 = value;
      $scope.percent5 = 100 * (value / $scope.max);
    };
    $scope.hoveringOver6 = function (value) {
      $scope.overStar6 = value;
      $scope.percent6 = 100 * (value / $scope.max);
    };
    $scope.hoveringOver7 = function (value) {
      $scope.overStar7 = value;
      $scope.percent7 = 100 * (value / $scope.max);
    };
    $scope.ratingStates = [
      {
        stateOn: 'glyphicon-ok-sign',
        stateOff: 'glyphicon-ok-circle'
      },
      {
        stateOn: 'glyphicon-star',
        stateOff: 'glyphicon-star-empty'
      },
      {
        stateOn: 'glyphicon-heart',
        stateOff: 'glyphicon-ban-circle'
      },
      { stateOn: 'glyphicon-heart' },
      { stateOff: 'glyphicon-off' }
    ];
    // Create new Goalie game self eval
    $scope.create = function () {
      // Create new Goalie game self eval object
      var goalieGameSelfEval = new GoalieGameSelfEvals({
          name: this.name,
          opponent: this.opponent,
          location: this.location,
          when: this.when,
          winloss: this.winloss,
          myrating: this.myrating,
          gaa: this.gaa,
          shots: this.shots,
          ga1: this.ga1,
          ga1rating: this.ga1rating,
          ga1fix: this.ga1fix,
          ga2: this.ga2,
          ga2rating: this.ga2rating,
          ga2fix: this.ga2fix,
          ga3: this.ga3,
          ga3rating: this.ga3rating,
          ga3fix: this.ga3fix,
          ga4: this.ga4,
          ga4rating: this.ga4rating,
          ga4fix: this.ga4fix,
          ga5: this.ga5,
          ga5rating: this.ga5rating,
          ga5fix: this.ga5fix,
          ga6: this.ga6,
          ga6rating: this.ga6rating,
          ga6fix: this.ga6fix,
          ga7: this.ga7,
          ga7rating: this.ga7rating,
          ga7fix: this.ga7fix,
          toworkon: this.toworkon
        });
      // Redirect after save
      goalieGameSelfEval.$save(function (response) {
        $location.path('goalie-game-self-evals/' + response._id);
        // Clear form fields
        $scope.name = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    // Remove existing Goalie game self eval
    $scope.remove = function (goalieGameSelfEval) {
      if (goalieGameSelfEval) {
        goalieGameSelfEval.$remove();
        for (var i in $scope.goalieGameSelfEvals) {
          if ($scope.goalieGameSelfEvals[i] === goalieGameSelfEval) {
            $scope.goalieGameSelfEvals.splice(i, 1);
          }
        }
      } else {
        $scope.goalieGameSelfEval.$remove(function () {
          $location.path('goalie-game-self-evals');
        });
      }
    };
    // Update existing Goalie game self eval
    $scope.update = function () {
      var goalieGameSelfEval = $scope.goalieGameSelfEval;
      goalieGameSelfEval.$update(function () {
        $location.path('goalie-game-self-evals/' + goalieGameSelfEval._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    // Find a list of Goalie game self evals
    $scope.find = function () {
      $scope.goalieGameSelfEvals = GoalieGameSelfEvals.query();
    };
    // Find existing Goalie game self eval
    $scope.findOne = function () {
      $scope.goalieGameSelfEval = GoalieGameSelfEvals.get({ goalieGameSelfEvalId: $stateParams.goalieGameSelfEvalId });
    };
  }
]);'use strict';
//Goalie game self evals service used to communicate Goalie game self evals REST endpoints
angular.module('goalie-game-self-evals').factory('GoalieGameSelfEvals', [
  '$resource',
  function ($resource) {
    return $resource('goalie-game-self-evals/:goalieGameSelfEvalId', { goalieGameSelfEvalId: '@_id' }, { update: { method: 'PUT' } });
  }
]);'use strict';
//Setting up route
angular.module('goaliedash').config([
  '$stateProvider',
  function ($stateProvider) {
    // Goaliedash state routing
    $stateProvider.state('goaliedash', {
      url: '/goaliedash',
      templateUrl: 'modules/goaliedash/views/goaliedash.client.view.html'
    });
  }
]);'use strict';
angular.module('goaliedash').controller('GoaliedashController', [
  '$scope',
  'Authentication',
  function ($scope, Authentication) {
    $scope.authentication = Authentication;
  }
]);'use strict';
//Setting up route
angular.module('playerdash').config([
  '$stateProvider',
  function ($stateProvider) {
    // Playerdash state routing
    $stateProvider.state('playerdashboard', {
      url: '/playerdashboard',
      templateUrl: 'modules/playerdash/views/playerdashboard.client.view.html'
    });
  }
]);'use strict';
angular.module('playerdash').controller('PlayerdashboardController', [
  '$scope',
  function ($scope) {
  }
]);'use strict';
// Config HTTP Error Handling
angular.module('users').config([
  '$httpProvider',
  function ($httpProvider) {
    // Set the httpProvider "not authorized" interceptor
    $httpProvider.interceptors.push([
      '$q',
      '$location',
      'Authentication',
      function ($q, $location, Authentication) {
        return {
          responseError: function (rejection) {
            switch (rejection.status) {
            case 401:
              // Deauthenticate the global user
              Authentication.user = null;
              // Redirect to signin page
              $location.path('signin');
              break;
            case 403:
              // Add unauthorized behaviour 
              break;
            }
            return $q.reject(rejection);
          }
        };
      }
    ]);
  }
]);'use strict';
// Setting up route
angular.module('users').config([
  '$stateProvider',
  function ($stateProvider) {
    // Users state routing
    $stateProvider.state('profile', {
      url: '/settings/profile',
      templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
    }).state('password', {
      url: '/settings/password',
      templateUrl: 'modules/users/views/settings/change-password.client.view.html'
    }).state('signup', {
      url: '/signup',
      templateUrl: 'modules/users/views/authentication/signup.client.view.html'
    }).state('signin', {
      url: '/signin',
      templateUrl: 'modules/users/views/authentication/signin.client.view.html'
    }).state('forgot', {
      url: '/password/forgot',
      templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
    }).state('reset-invlaid', {
      url: '/password/reset/invalid',
      templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
    }).state('reset-success', {
      url: '/password/reset/success',
      templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
    }).state('reset', {
      url: '/password/reset/:token',
      templateUrl: 'modules/users/views/password/reset-password.client.view.html'
    });
  }
]);'use strict';
angular.module('users').controller('AuthenticationController', [
  '$scope',
  '$http',
  '$location',
  'Authentication',
  function ($scope, $http, $location, Authentication) {
    $scope.authentication = Authentication;
    // If user is signed in then redirect back home
    if ($scope.authentication.user)
      $location.path('/');
    $scope.signup = function () {
      $http.post('/auth/signup', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;
        // And redirect to the index page
        $location.path('/');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    $scope.signin = function () {
      $http.post('/auth/signin', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;
        // And redirect to the index page
        $location.path('/');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
angular.module('users').controller('PasswordController', [
  '$scope',
  '$stateParams',
  '$http',
  '$location',
  'Authentication',
  function ($scope, $stateParams, $http, $location, Authentication) {
    $scope.authentication = Authentication;
    //If user is signed in then redirect back home
    if ($scope.authentication.user)
      $location.path('/');
    // Submit forgotten password account id
    $scope.askForPasswordReset = function () {
      $scope.success = $scope.error = null;
      $http.post('/auth/forgot', $scope.credentials).success(function (response) {
        // Show user success message and clear form
        $scope.credentials = null;
        $scope.success = response.message;
      }).error(function (response) {
        // Show user error message and clear form
        $scope.credentials = null;
        $scope.error = response.message;
      });
    };
    // Change user password
    $scope.resetUserPassword = function () {
      $scope.success = $scope.error = null;
      $http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function (response) {
        // If successful show success message and clear form
        $scope.passwordDetails = null;
        // Attach user profile
        Authentication.user = response;
        // And redirect to the index page
        $location.path('/password/reset/success');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
angular.module('users').controller('SettingsController', [
  '$scope',
  '$http',
  '$location',
  'Users',
  'Authentication',
  function ($scope, $http, $location, Users, Authentication) {
    $scope.user = Authentication.user;
    // If user is not signed in then redirect back home
    if (!$scope.user)
      $location.path('/');
    // Check if there are additional accounts 
    $scope.hasConnectedAdditionalSocialAccounts = function (provider) {
      for (var i in $scope.user.additionalProvidersData) {
        return true;
      }
      return false;
    };
    // Check if provider is already in use with current user
    $scope.isConnectedSocialAccount = function (provider) {
      return $scope.user.provider === provider || $scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider];
    };
    // Remove a user social account
    $scope.removeUserSocialAccount = function (provider) {
      $scope.success = $scope.error = null;
      $http.delete('/users/accounts', { params: { provider: provider } }).success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.user = Authentication.user = response;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    // Update a user profile
    $scope.updateUserProfile = function (isValid) {
      if (isValid) {
        $scope.success = $scope.error = null;
        var user = new Users($scope.user);
        user.$update(function (response) {
          $scope.success = true;
          Authentication.user = response;
        }, function (response) {
          $scope.error = response.data.message;
        });
      } else {
        $scope.submitted = true;
      }
    };
    // Change user password
    $scope.changeUserPassword = function () {
      $scope.success = $scope.error = null;
      $http.post('/users/password', $scope.passwordDetails).success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.passwordDetails = null;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
// Authentication service for user variables
angular.module('users').factory('Authentication', [function () {
    var _this = this;
    _this._data = { user: window.user };
    return _this._data;
  }]);'use strict';
// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', [
  '$resource',
  function ($resource) {
    return $resource('users', {}, { update: { method: 'PUT' } });
  }
]);