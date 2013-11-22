'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var services = angular.module('myApp.services', []);
  	
services.value('version', '0.1');

services.factory('couchDB', ['$rootScope', function($rootScope) {
 	console.log('Accesing CouchDB Service');

	var db = new PouchDB('dgm3790_gp');
	var remoteCouch = 'http://127.0.0.1:5984/dgm3790_gp/';

	db.replicate.to(remoteCouch, {continuous: true, complete: syncError});
  	db.replicate.from(remoteCouch, {continuous: true, complete: syncError});

  	function syncError() {
  		console.log('Disconnected from DB, for some reason...')
  	}

	return db;

 }]);
