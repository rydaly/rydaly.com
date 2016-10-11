'use strict';
/* global angular */

angular.module('rydaly')
  .directive('labView', function() {
    return {
      scope: true,
      controller: 'LabController',
      controllerAs: 'labCtrl',
      templateUrl: 'app/components/views/lab/lab_view.html'
    };
  });
