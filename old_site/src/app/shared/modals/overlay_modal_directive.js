'use strict';
/* global angular */

angular.module('rydaly')
  .directive('overlayModal', function() {
    return {
      templateUrl: 'app/shared/modals/overlay_modal.html'
    };
  });
