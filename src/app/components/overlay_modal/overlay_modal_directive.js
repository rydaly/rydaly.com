'use strict';
/* global angular */

angular.module('rydaly')
  .directive('overlayModal', function() {
    return {
      scope: true,
      templateUrl: 'app/components/overlay_modal/overlay_modal.html'
    };
  });
