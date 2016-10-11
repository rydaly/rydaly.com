'use strict';
/* global angular */

angular.module('rydaly')
  .directive('workView', function() {
    return {
      scope: true,
      controller: 'WorkController',
      controllerAs: 'workCtrl',
      templateUrl: 'app/components/views/work/work_view.html'
    };
  });
