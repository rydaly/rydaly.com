'use strict';

angular.module('rydaly')
  .factory('LabItemsService', function($http) {
    var url = 'data/labItems.json';
    return $http({
      method: 'GET',
      url: url,
      cache: true
    });
  });
