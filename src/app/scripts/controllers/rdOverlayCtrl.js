'use strict';

/* global angular */

angular.module('rydaly')
  .controller('OverlayController', OverlayController);

function OverlayController($scope, $window, modals) {
  if(modals.params().type === 'overlay') {
    // type: overlay
    $scope.title = modals.params().title;
    $scope.description = modals.params().description;
    $scope.imgLogo = modals.params().imgLogo;
    $scope.subItems = modals.params().subItems;
    $scope.pngSeq = modals.params().pngSeq;
    $scope.imgsSeq = modals.params().imgsSeq;
    $scope.itemImagesHi = modals.params().itemImagesHi;
    $scope.itemImagesLow = modals.params().itemImagesLow;
    $scope.hasVideo = modals.params().hasVideo;
    $scope.ytid = modals.params().ytid;
    $scope.itemRoles = modals.params().itemRoles;
    $scope.itemCta = modals.params().itemCta;
    $scope.itemCtaText = modals.params().itemCtaText;

    // returns small images if small screen
    $scope.getSize = function(subItem) {
      // console.log($scope.imgsSeq);
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
    // type: simple
    $scope.modalContentObj = modals.params().content;
  }

  // shared properties
  $scope.close = modals.resolve;
}
