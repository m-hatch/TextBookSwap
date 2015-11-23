
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
    templateUrl: 'views/searches.html',
    controller: 'titleCtrl',
    activetab: 'titles'
  })
  .when('/authors', {
    templateUrl: 'views/searches.html',
    controller: 'authorCtrl',
    activetab: 'authors'
  })
  .when('/courses', {
    templateUrl: 'views/searches.html',
    controller: 'courseCtrl',
    activetab: 'courses'
  })
  .when('/account', {
    templateUrl: 'views/account.html',
    controller: 'accountCtrl',
    activetab: 'account'
  })
  .when('/books/:id', {
    templateUrl: 'views/detail.html',
    controller: 'bookCtrl',
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

//search service
app.service('SearchService', function(){
	this.filtered_result = function(input, query, field) {
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
	    	if(field == "title")
	    		found = (product.title.toLowerCase().indexOf(term.toLowerCase()) > -1);
	    	if(field == "author")
	    		found = (product.author.toLowerCase().indexOf(term.toLowerCase()) > -1);
	    	if(field == "course")
	    		found = (product.dept.toLowerCase().indexOf(term.toLowerCase()) > -1)
	    		|| (product.course.toLowerCase().indexOf(term.toLowerCase()) > -1);
	        
	        passTest = passTest && found;
	      });
	
	      // Add product to output array only if passTest is true -- all search terms were found in product
	      if (passTest) { output.push(product); }
	    });
	
	    return output;
	  }
});

app.controller('titleCtrl', function($scope, $http, $route, SearchService) {
  $scope.books = null;
  $scope.placeholder = "search titles...";
  $http.get('http://localhost/textbookswap/webapi/books')
  .success(function(response){
	  $scope.allbooks = response;
  });
  // filter results on button click
  $scope.search = function(){
	  $scope.books = SearchService.filtered_result($scope.allbooks, $scope.query, "title");
  }
  $scope.$route = $route;
});

app.controller('authorCtrl', function($scope, $http, $route, SearchService) {
  $scope.books = null;
  $scope.placeholder = "search authors...";
  $http.get('http://localhost/textbookswap/webapi/books')
  .success(function(response){
	  $scope.allbooks = response;
  });
  // filter results on button click
  $scope.search = function(){
	  $scope.books = SearchService.filtered_result($scope.allbooks, $scope.query, "author");
  }
  $scope.$route = $route;
});

app.controller('courseCtrl', function($scope, $http, $route, SearchService) {
  $scope.books = null;
  $scope.placeholder = "search dept/course...";
  $http.get('http://localhost/textbookswap/webapi/books')
  .success(function(response){
	  $scope.allbooks = response;
  });
  // filter results on button click
  $scope.search = function(){
	  $scope.books = SearchService.filtered_result($scope.allbooks, $scope.query, "course");
  }
  $scope.$route = $route;
});

app.controller('bookCtrl', function($scope, $http, $routeParams) {
  $http.get('http://localhost/textbookswap/webapi/books/'  + $routeParams.id)
  .success(function(response){
	  $scope.book = response;
  });
});