'use strict';
/* global angular */

angular.module('rydaly')
  .directive('hiView', function() {
    return {
      scope: true,
      controller: 'HiController',
      controllerAs: 'hiCtrl',
      templateUrl: 'app/components/views/hi/hi_view.html'
    };
  });
