'use strict';
/* global angular */

angular.module('rydaly')
  .directive('overlaySimple', function() {
    return {
      scope: true,
      controller: 'OverlayModalController',
      controllerAs: 'overlayCtrl',
      templateUrl: 'app/components/overlay_modal/overlay_types/overlay_simple.html'
    };
  });
