
// base module
var app = angular.module('bkApp', ['ngRoute']);

// configure routes
app.config(function($routeProvider, $locationProvider){
  $routeProvider

  .when('/', {
    templateUrl: 'views/books.html',
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


app.controller('mainCtrl', function($scope, $http, $route) {
  $http.get('http://localhost/textbookswap/webapi/books')
  .success(function(response){
	  $scope.books = response;
  });
  $scope.$route = $route;
});

app.directive('dynamicHeight', ['$window', function($window) {
    return {
        link: function(scope, elem, attrs) {
            scope.onResize = function() {
                var item = document.getElementsByClassName('view_img')[0];
                var height = item.clientWidth * 1.25;
                elem.css('height', height + 'px');
            }
            scope.onResize();

            angular.element($window).bind('resize', function() {
                scope.onResize();
            })
        }
    }
}]);

app.controller('titlesCtrl', function($scope, $http, $route) {
  $scope.books = null;
  $http.get('http://localhost/textbookswap/webapi/books')
  .success(function(response){
	  $scope.allbooks = response;
  });
  
  $scope.filtered_result = function(input, query) {
    // returns nothing if nothing in query box
    if (!query) return '';

    //split query terms by space character
    var terms = query.split(' ');
    var output = [];

    // iterate through input array
    input.forEach(function(product){
      var found = false;
      passTest = true;

      // iterate through terms found in query box
      terms.forEach(function(term){
       
        // if all terms are found set boolean to true
        found = (product.title.toLowerCase().indexOf(term.toLowerCase()) > -1);
        
        passTest = passTest && found;
      });

      // Add product to output array only if passTest is true -- all search terms were found in product
      if (passTest) { output.push(product); }
    });

    return output;
  }
  // filter results on button click
  $scope.search = function(){
	  $scope.books = $scope.filtered_result($scope.allbooks, $scope.query);
  }
  $scope.$route = $route;
});