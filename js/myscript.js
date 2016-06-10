var myApp = angular.module("BagasusApp", ["ngRoute"]);

myApp.config(function($routeProvider){
	$routeProvider.when('/', {
		// title: 'Home',
		// template: '<p> {{ hi }} </p>',
		templateUrl: 'login.html',
		controller: 'LoginController'
	});

	$routeProvider.when('/user/:username&:access_token&:refresh_token&:token_type', {
		// title: 'Home',
		// template: '<p> {{ hi }} </p>',
		templateUrl: 'user.html',
		controller: 'UserController'
	});

	$routeProvider.when('/carrier', {
		// title: 'About',
		templateUrl: 'carrier.html',
		controller: 'CarrierController'
	});

	$routeProvider.when('/store', {
		// title: 'Contact',
		templateUrl: 'store.html',
		controller: 'StoreController'
	});

	$routeProvider.when('/buyer', {
		// title: 'Contact',
		templateUrl: 'buyer.html',
		controller: 'BuyerController'
	});

	$routeProvider.otherwise({
		// title: '404',
		templateUrl: '404.html',
		controller: 'ErrorController'
	})	
})

myApp.controller('LoginController', function($scope, $rootScope, $location, memberDataStoreService, $window){
	$scope.pageName = "Login";

	$scope.user = { userName: 'thu.nguyen', passWord: '202cb962ac59075b964b07152d234b70' };

	//// Collector GAE
	// $scope.$digest(function(){
	// 	var promise = memberDataStoreService.doRegistration('get', 'https://yc-payment.appspot.com/get-port', null);

	// 	promise.success(function (data, status) {
	// 		$rootScope.collectorURLSuccess  = JSON.parse(data.message)['url'];
	// 		alert($rootScope.collectorURLSuccess);
	// 	});
			
	// 	promise.error(function (data, status) {
	// 		$rootScope.collectorURLSuccess  = null;
	// 	});
	// });

	var promise = memberDataStoreService.doRegistration('get', 'https://yc-payment.appspot.com/get-port', null);

	promise.success(function (data, status) {
		$rootScope.collectorURLSuccess  = JSON.parse(data.message)['url'];
		// alert($rootScope.collectorURLSuccess);
	});
		
	promise.error(function (data, status) {
		$rootScope.collectorURLSuccess  = null;
	});



	// Test GAE
	// $scope.$digest(function(){
	// 	var promise = memberDataStoreService.doRegistration('get', 'https://yc-payment.appspot.com/get-port?module=test', null);

	// 	promise.success(function (data, status) {
	// 		$rootScope.testURLSuccess  = JSON.parse(data.message)['url'];
	// 	});
			
	// 	promise.error(function (data, status) {
	// 		$rootScope.testURLSuccess  = null;
	// 	});
	// });

	promise = memberDataStoreService.doRegistration('get', 'https://yc-payment.appspot.com/get-port?module=test', null);

	promise.success(function (data, status) {
		$rootScope.testURLSuccess  = JSON.parse(data.message)['url'];
	});
		
	promise.error(function (data, status) {
		$rootScope.testURLSuccess  = null;
	});


	$scope.submitLogin = function (){
		var promise = memberDataStoreService.doRegistration(
			'post', 
			$rootScope.collectorURLSuccess + '/_ah/api/user/carrier/jmeter/login', 
			$scope.user
		);

		promise.success(function (data, status) {
			// $scope.collectorURLSuccess  = JSON.parse(data.message)['url'];
			// $rootScope.user = JSON.parse(data.message);
			// alert(data.message);
			// $location.path("user", {'input' : JSON.parse(data.message)});
			var tmp = JSON.parse(data.message);
			url = "user/" 
				+ tmp.carrierInfo.name + '&' 
				+ $window.encodeURIComponent(tmp.tokenDTO.access_token) + '&' 
				+ $window.encodeURIComponent(tmp.tokenDTO.refresh_token) + '&' 
				+ tmp.tokenDTO.token_type;
			$location.path(url);
		});
			
		promise.error(function (data, status) {
			$location.path("/");
		});
	}
})

myApp.controller('UserController', function($scope, $routeParams, $window){
	$scope.pageName = "User";
	$scope.username = $routeParams.username;

	$scope.access_token = $window.decodeURIComponent($routeParams.access_token);
	$scope.refresh_token = $window.decodeURIComponent($routeParams.refresh_token);
	$scope.token_type = $routeParams.token_type;
})

myApp.controller('CarrierController', function($scope){
	$scope.pageName = "Carrier";
})

myApp.controller('StoreController', function($scope){
	$scope.pageName = "Store";
})

myApp.controller('BuyerController', function($scope){
	$scope.pageName = "Buyer";
})

myApp.controller('ErrorController', function($scope){
	$scope.pageName = "Error";
})

myApp.factory('memberDataStoreService', function ($http) {
	var memberDataStore = {};	
	memberDataStore.doRegistration = function (method, url, theData) {
		var promise = $http(
			{
				method: method, 
				url: url,
				data: theData
			}
		);
		return promise;
	}
	return memberDataStore;
})