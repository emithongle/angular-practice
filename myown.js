var myApp = angular.module("MyApp", ["ngRoute"]);

myApp.config(function($routeProvider){
	$routeProvider.when('/', {
		// title: 'Home',
		// template: '<p> {{ hi }} </p>',
		templateUrl: 'home.html',
		controller: 'HomeController'
	});

	$routeProvider.when('/about', {
		// title: 'About',
		template: '<p> {{ hi }} </p>',
		controller: 'AboutController'
	});

	$routeProvider.when('/contact', {
		// title: 'Contact',
		template: '<p> {{ hi }} </p>',
		controller: 'ContactController'
	});

	$routeProvider.otherwise({
		// title: '404',
		template: '<p> {{ hi }} </p>',
		controller: 'ErrorController'
	})	
})

myApp.controller('HomeController', function($scope){
	$scope.hi = "This is Home Page";
})

myApp.controller('AboutController', function($scope){
	$scope.hi = "This is About Page";	
})

myApp.controller('ContactController', function($scope){
	$scope.hi = "This is Contact Page";
})

myApp.controller('ErrorController', function($scope){
	$scope.hi = "This is Error Page";
})