'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  // controller('AppCtrl', function ($scope, $http) {
  //   $http({
  //     method: 'GET',
  //     url: '/api/name'
  //   }).
  //   success(function (data, status, headers, config) {
  //     $scope.name = data.name;
  //   }).
  //   error(function (data, status, headers, config) {
  //     $scope.name = 'Error!'
  //   });
  // }).
  controller('homeCtrl', function ($scope, $http) {
    console.log('getting Data');
    $http.get('/js/data/dataStore.json').success(function(data) {
      $scope.captions = data.captions;
      //console.log($scope.captions);
    });
  }).
  controller('captionCtrl', function ($scope, $http, $routeParams) {
    
    //Get Sample DataStore from local
    $http.get('/js/data/comic/' + $routeParams.captionID + '.json').success( function (data) {
      console.log('Grabbing Local Data');
      $scope.data = data;
      console.log($scope.data);
    });

    //Get CouchDB Store
    console.log('Attemping to access DB');
    $http.get('/api/' + $routeParams.captionID).success(function (data) {
      $scope.remote = data;
      console.log($scope.remote);
    });

    $scope.plusCaption = function(theID) {
      var someVar = theID;
      console.log(someVar);
      $http.get('/api/update/' + $routeParams.captionID).success(function (data) {
        console.log('I updated the DB!');
      });
    }

    //Firing Swipe
   
    // window.mySwipe = Swipe(document.getElementById('slider'));


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
  
