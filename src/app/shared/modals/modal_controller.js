'use strict';

/* global angular */

angular.module('rydaly')
  .controller('ModalController', ModalController);

function ModalController($scope, $window, modals) {

  if (modals.params().type === 'overlay') {
    $scope.modalsData = modals.params();
    $scope.pngSeq = modals.params().pngSeq;
    $scope.imgsSeq = modals.params().imgsSeq;
    $scope.itemImagesHi = modals.params().itemImagesHi;
    $scope.itemImagesLow = modals.params().itemImagesLow;
    $scope.smallScreen = $window.innerWidth < 640;

    // returns small images if small screen
    $scope.getImages = function(subItem) {
      var smallScreen = $window.innerWidth < 640;

      if ($scope.pngSeq) return $scope.imgsSeq; // animation sequence objects

      if (subItem) {
        if (smallScreen) return subItem.imgsLow;
        return subItem.imgsHi;
      } else {
        if (smallScreen) return $scope.itemImagesLow;
        return $scope.itemImagesHi;
      }
    };
  } else {
    // type: 'simple'
    $scope.modalContentObj = modals.params().content;
  }

  // shared properties
  $scope.close = modals.resolve;
}
