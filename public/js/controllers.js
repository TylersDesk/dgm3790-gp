'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {
    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!'
    });
  }).
  controller('homeCtrl', function ($scope, $http) {
    console.log('getting Data');
    $http.get('/js/data/dataStore.json').success(function(data) {
      $scope.captions = data.captions;
      console.log($scope.captions);
    });
  }).
  controller('captionCtrl', function ($scope, $http, $routeParams) {
    console.log('/js/data/comic/' + $routeParams.captionID + '.json');
    $http.get('/js/data/comic/' + $routeParams.captionID + '.json').success( function (data) {
      $scope.data = data;
      console.log($scope.data);
    });
  });

// function AlertDemoCtrl($scope) {
//   $scope.alerts = [
//     { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' }, 
//     { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
//   ];

//   $scope.addAlert = function() {
//     $scope.alerts.push({ type: 'info', msg: "Another alert!"});
//   };

//   $scope.closeAlert = function(index) {
//     $scope.alerts.splice(index, 1);
//   };

// }
  
