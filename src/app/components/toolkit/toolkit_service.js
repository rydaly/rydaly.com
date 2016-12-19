'use strict';

/* global angular */

angular.module('rydaly')
  .factory('ToolkitService', function($http) {
    var url = 'data/skills.json';
    return $http({
      method: 'GET',
      url: url,
      cache: true
    });
  });
