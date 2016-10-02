'use strict';
/* global angular */

angular.module('rydaly')
  .directive('overlayWork', function() {
    return {
      scope: true,
      controller: 'OverlayModalController',
      controllerAs: 'overlayCtrl',
      templateUrl: 'app/components/overlay_modal/overlay_types/overlay_work.html'
    };
  });
