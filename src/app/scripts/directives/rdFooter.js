'use strict';
/* global angular */

angular.module('rydaly').directive('rdFooter', function () {
  return {
    replace: true,
    restrict: 'E',
    templateUrl: 'app/views/partials/footer.html'
  };
});