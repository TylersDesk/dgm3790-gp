'use strict';
var globalCaptionID;

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
   $scope.predicate = 'plus';
   $scope.currentPage = $routeParams.captionID;
   globalCaptionID = $routeParams.captionID;
  // ROUND 2

  function getCaptions() {
    couchDB.query({
      map: mapCaption
    }, {
      reduce: false
    }, function(err, response) {
      console.log(response);
      $scope.capSet = response.rows;
      $scope.$apply();
      window.mySwipe = Swipe(document.getElementById('slider'));
    });
  }

  getCaptions();

  function mapCaption(doc) {
    if (doc.caption == globalCaptionID) {
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

  $scope.captionScore = function(docID,addOrMinus) {
    couchDB.get(docID, function(err, doc) {
      console.log(doc);
      var updatedDoc = {
        _id     : doc._id,
        _rev    : doc._rev,
        title   : doc.title,
        caption : doc.caption,
        plus    : updatePlus(addOrMinus, doc.plus),
        minus   : 0
      };
      console.log(updatedDoc);
      couchDB.put(updatedDoc, function(err, response) {
        console.log('Updated a dcument');
      });

    });
  }

  function updatePlus(addOrMinus, current) {
    var returnValue;

    if (addOrMinus === "add") {
      returnValue = current + 1;
      console.log("Current Value is: " + returnValue);
    } else {
      returnValue = current - 1;
      if (returnValue <= 0) {
        returnValue = 0;
      } 
    }

    return returnValue
  }

  $scope.sortMe = function() {
        return function(object) {
            return object.value.plus;
        }
    }
});
