'use strict';

/* global angular */

angular.module('rydaly')
  .factory('WorkItemsService', function($http) {
    var url = 'data/workItems.json';
    return $http({
    	method: 'GET',
    	url: url,
    	cache: true
    });
  });