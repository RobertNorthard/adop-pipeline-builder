'use strict';

/* global angular */
/* eslint no-undef: "error" */
var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider.when('/',
    {
      templateUrl: '/partials/main',
      controller: 'mainCtrl'
    }
  );

});

app.controller('mainCtrl', function ($scope) {

});
