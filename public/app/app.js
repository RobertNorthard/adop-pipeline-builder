'use strict';

var app = angular.module('app', ['ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider){
	$locationProvider.html5Mode(true);

	$routeProvider
		.when(
			'/',
			{
				templateUrl: '/partials/main',
				controller: 'mainCtrl'
			}
		);


});

angular.module('app').controller('mainCtrl', function($scope){

	$scope.var = 'Hello World';	
console.log('hi');
});