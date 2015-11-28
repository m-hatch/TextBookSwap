
// base module
var app = angular.module('bkApp', ['ngRoute', 'ngCookies']);

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


app.controller('headerCtrl', function($scope, $http, $cookies) {
	if(typeof $cookies.get('username') != 'undefined'){
	  set();
	  hide();
	}
	
  //addEventListener('load', login, false);
  $scope.login = function(){
	  $http.get('http://localhost/textbookswap/webapi/users/validate/' 
			  + $scope.username + "/" + $scope.password)
	  .success(function(response){
		  $cookies.put('username', response.username);
		  $cookies.put('id', response.id);
		  set();
		  hide();
	  })
	  .error(function(data, status) {
		  alert("Incorrect username or password.")
	  });
  }
  $scope.logout = function($window){
	  $cookies.remove('username');
	  $cookies.remove('id');
	  show();
  }
  $scope.signup = function(){
	  var data = JSON.stringify({
          username: $scope.username,
          password: $scope.password,
          email: $scope.email
      });
	  //console.log(data);
	  $http.post('http://localhost/textbookswap/webapi/users', data)
	  .success(function(response){
		  $cookies.put('username', response.username);
		  $cookies.put('id', response.id);
		  set();
		  hide();
	  });
  }
  
  function show(){
	  $scope.showbtns = {'display': 'block'};
	  $scope.showmsg = {'display': 'none'};
  }
  function hide(){
	  $scope.showbtns = {'display': 'none'};
	  $scope.showmsg = {'display': 'block'};
  }
  function set(){
	  $scope.u_name = $cookies.get('username');
	  $scope.u_id = $cookies.get('id');
  }
});

app.controller('mainCtrl', function($scope, $http, $route) {
  $http.get('http://localhost/textbookswap/webapi/books')
  .success(function(response){
	  $scope.books = response;
  });
  $scope.$route = $route;
});

// dynamic height
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
	    	if(field == "user")
	    		found = (product.user.indexOf(term) > -1);
	        
	        passTest = passTest && found;
	      });
	
	      // Add product to output array only if passTest is true -- all search terms were found in product
	      if (passTest) { output.push(product); }
	    });
	
	    return output;
	  }
});

//popup service
app.service('popupService', function($window){

  this.showPopup = function(message){
    return $window.confirm(message);
  }
});

//format date service
app.service('formatDateService', function(){
	this.formatDate = function(d){
		//get the month
	    var month = d.getMonth();
	    //get the day
	    var day = d.getDate();
	    //get the year
	    var year = d.getFullYear();

	    //pull the last two digits of the year
	    year = year.toString().substr(2,2);

	    //increment month by 1 since it is 0 indexed
	    month = month + 1;
	    //converts month to a string
	    month = month + "";

	    //if month is 1-9 pad right with a 0 for two digits
	    if (month.length == 1)
	    {
	        month = "0" + month;
	    }

	    //convert day to string
	    day = day + "";

	    //if day is between 1-9 pad right with a 0 for two digits
	    if (day.length == 1)
	    {
	        day = "0" + day;
	    }

	    //return the string "MM/dd/yy"
	    return month + "/" + day + "/" + year;
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

app.controller('accountCtrl', function($scope, 
		$http, $route, $cookies, SearchService, popupService, formatDateService) {
	$scope.books = null;
	$scope.user = null;
	$scope.bkMsg = '';
	getUser(); //gets user id from cookies
	
	// get user object
	$http.get('http://localhost/textbookswap/webapi/users/' + $scope.u_id)
	.success(function(response){
		$scope.user = response;
	});
	
	// get user books
	$http.get('http://localhost/textbookswap/webapi/books')
	.success(function(response){
		$scope.allbooks = response;
		search();
	});
	
	// edit user
	$scope.showAccount = function() {
		$scope.acct = {'opacity': '1', 'pointer-events': 'auto'}
	};
	
	$scope.editAccount = function() {
		var data = JSON.stringify({
            username: $scope.user.username,
            password: $scope.user.password,
            email: $scope.user.email,
            id: $scope.user.id
        });
		$http.put('http://localhost/textbookswap/webapi/users/' + $scope.user.id, data)
		.success(function(response){
			$scope.user = response;
		});
		$scope.acct = {'opacity': '0', 'pointer-events': 'none'}
	};
	
	$scope.closeAccount = function() {
		$scope.acct = {'opacity': '0', 'pointer-events': 'none'}
	};
	
	// add book
	$scope.newBk = {
		title: null,
		author: null,
		dept: null,
		course: null,
		image: null,
		price: null,
		date: null,
		user: null,
		email: null
	}
	$scope.showNewBk = function() {
		$scope.newbook = {'opacity': '1', 'pointer-events': 'auto'};
		$scope.bkMsg = 'Add';
		$scope.newBk = {
			title: null,
			author: null,
			dept: null,
			course: null,
			image: null,
			price: null,
			date: null,
			user: null,
			email: null
		}
	};
	
	$scope.addNewBk = function() {
		var d = new Date();
		$scope.newBk.date = formatDateService.formatDate(d);
		$scope.newBk.user = $scope.user.id;
		$scope.newBk.email = $scope.user.email;
		var data = JSON.stringify($scope.newBk);
		
		$http.post('http://localhost/textbookswap/webapi/books', data)
		.success(function(response){
			var currentBooks = $scope.books;
			var newList = currentBooks.concat(response);
			$scope.books = newList;
		});
		$scope.newbook = {'opacity': '0', 'pointer-events': 'none'};
	};
	
	$scope.closeNewBk = function() {
		$scope.newbook = {'opacity': '0', 'pointer-events': 'none'};
	};
	
	// delete book
	$scope.removeBk = function(id) {
	  if (popupService.showPopup('Are you sure you want to delete this?')) {
	    $http.delete('http://localhost/textbookswap/webapi/books/' + id);
	    $route.reload();
	  }
	};
	
	// edit book
	$scope.showEditBk = function(id) {
		$scope.newbook = {'opacity': '1', 'pointer-events': 'auto'};
		$scope.bkMsg = 'Edit';
		
		$http.get('http://localhost/textbookswap/webapi/books/' + id)
		.success(function(response){
			$scope.newBk = response;
			var d = new Date();
			$scope.newBk.date = formatDateService.formatDate(d);
		});
	};
	
	$scope.editBk = function(id) {
		var data = JSON.stringify($scope.newBk);
		
		$http.put('http://localhost/textbookswap/webapi/books/' + id, data)
		.success(function(response){
			//var currentBooks = $scope.books;
			//var newList = currentBooks.concat(response);
			//$scope.books = newList;
		});
		$scope.newbook = {'opacity': '0', 'pointer-events': 'none'}
	};
	
    $scope.$route = $route;
    
    function search(){
  	  $scope.books = SearchService.filtered_result($scope.allbooks, $scope.u_id, "user");
    }
    function getUser(){
		if(typeof $cookies.get('username') != 'undefined'){
			$scope.u_name = $cookies.get('username');
			$scope.u_id = $cookies.get('id');
		}
    }
});