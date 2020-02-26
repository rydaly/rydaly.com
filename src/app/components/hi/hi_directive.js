'use strict';

angular.module('rydaly')
  .directive('hiView', function() {
    return {
      scope: true,
      controller: 'HiController',
      controllerAs: 'hiCtrl',
      templateUrl: 'app/components/hi/hi_view.html'
    };
  });
