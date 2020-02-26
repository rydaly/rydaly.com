'use strict';

angular.module('rydaly')
  .directive('labView', function() {
    return {
      scope: true,
      controller: 'LabController',
      controllerAs: 'labCtrl',
      templateUrl: 'app/components/lab/lab_view.html'
    };
  });
