'use strict';

angular.module('rydaly')
  .directive('mainBody', function() {
    return {
      scope: true,
      templateUrl: 'app/components/main_body/main_body.html'
    };
  });
