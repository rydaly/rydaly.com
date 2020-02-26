'use strict';

angular.module('rydaly')
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
