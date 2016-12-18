'use strict';
/* global angular */

angular.module('rydaly')
  .directive('overlayWork', function() {
    return {
      scope: true,
      controller: 'ModalController',
      controllerAs: 'overlayCtrl',
      templateUrl: 'app/shared/modals/overlay_types/overlay_work.html'
    };
  });
