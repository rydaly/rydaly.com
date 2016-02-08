'use strict';

angular.module('rydaly')
  .factory('WorkItemsService', function($http) {
    var url = 'data/workItems.json';
    return $http.get(url);
  });