'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'ui.bootstrap'
]).
config(function ($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'partials/home.html',
      controller: 'homeCtrl'
    }).
    when('/caption/:captionID', {
      templateUrl: 'partials/caption.html',
      controller: 'captionCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });

  //$locationProvider.html5Mode(true);
});
