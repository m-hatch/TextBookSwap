
// base module
var app = angular.module('bkApp', ['ngRoute']);

// configure routes
app.config(function($routeProvider, $locationProvider){
  $routeProvider

  .when('/', {
    templateUrl: 'views/home.html',
    controller: 'mainCtrl',
    activetab: 'home'
  })
  .when('/titles', {
    templateUrl: 'views/titles.html',
    controller: 'titlesCtrl',
    activetab: 'titles'
  })
  .when('/authors', {
    templateUrl: 'views/authors.html',
    controller: 'authorsCtrl',
    activetab: 'authors'
  })
  .when('/courses', {
    templateUrl: 'views/courses.html',
    controller: 'coursesCtrl',
    activetab: 'courses'
  })
  .when('/account', {
    templateUrl: 'views/account.html',
    controller: 'accountCtrl',
    activetab: 'account'
  })
  .when('/media/:id', {
    templateUrl: 'pages/media-detail.html',
    controller: 'mediaCtrl',
    activetab: 'media'
  })
  // catch all
  .otherwise({ redirectTo: '/' });

  // HTML5 history API
  $locationProvider.html5Mode(true);
});


app.controller('mainCtrl', function($scope) {
  
});