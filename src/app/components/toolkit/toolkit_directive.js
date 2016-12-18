'use strict';
/* global angular */

angular.module('rydaly')
  .directive('toolkitView', function() {
    return {
      scope: true,
      controller: 'ToolkitController',
      controllerAs: 'toolkitCtrl',
      templateUrl: 'app/components/toolkit/toolkit_view.html'
    };
  });
