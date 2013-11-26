'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
controller('AppCtrl', function($scope, $http) {
  // $http({
  //   method: 'GET',
  //   url: '/api/name'
  // }).
  // success(function (data, status, headers, config) {
  //   $scope.name = data.name;
  // }).
  // error(function (data, status, headers, config) {
  //   $scope.name = 'Error!'
  // });
}).
controller('homeCtrl', function($scope, $http) {
  console.log('getting Data');
  $http.get('/js/data/dataStore.json').success(function(data) {
    $scope.captions = data.captions;
    console.log($scope.captions);
  });
}).
controller('captionCtrl', function($scope, $http, $routeParams, couchDB) {
  //console.log('Fire in the hole!');

  // ROUND 2

  function getCaptions() {
    couchDB.query({
      map: mapCaption
    }, {
      reduce: false
    }, function(err, response) {
      console.log(response);
      $scope.capSet = response.rows;
      console.log($scope.capSet);
      $scope.$apply();
      window.mySwipe = Swipe(document.getElementById('slider'));
    });
  }

  getCaptions();

  function mapCaption(doc, docID) {
    if (doc.captoin == docID) {
      emit(doc.title, doc);
    }
  }

  $scope.AC = function(text, captionID) {
    var caption = {
      _id: new Date().toISOString(),
      title: text,
      caption: captionID,
      plus: 0,
      minus: 0
    };
    couchDB.put(caption, function callback(err, result) {
      if (!err) {
        console.log('Successfully posted a caption!');
        getCaptions();
      }
    });
  }

  $scope.currentPage = $routeParams.captionID;

  couchDB.info(function(err, info) {
    couchDB.changes({
      since: info.update_seq,
      continuous: true,
      onChange: updateUI
    });
  });

  function updateUI() {
    console.log('Maybe push to scope and update here?');
    getCaptions();
  }



  //Round1

  // //console.log('/js/data/comic/' + $routeParams.captionID + '.json');
  // $http.get('/js/data/comic/' + $routeParams.captionID + '.json').success( function (data) {
  //   //$scope.data = data;
  //   //console.log($scope.data);



  //   //console.log($scope.capSet[0]);


  // });
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