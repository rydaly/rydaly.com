'use strict';

angular.module('rydaly')
  .directive('workView', function() {
    return {
      scope: true,
      controller: 'WorkController',
      controllerAs: 'workCtrl',
      templateUrl: 'app/components/work/work_view.html'
    };
  });
