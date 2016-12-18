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
  })
  .factory('ToolkitEventService', function($rootScope) {
    var toolkitEventService = {};

    toolkitEventService.message = '';

    toolkitEventService.initBroadcast = function(msg, data) {
      this.message = msg;
      this.data = data;
      this.broadcast();
    };

    toolkitEventService.broadcast = function() {
      $rootScope.$broadcast('handleBroadcast');
    };

    return toolkitEventService;
  });
