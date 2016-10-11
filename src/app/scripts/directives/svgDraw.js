'use strict';
/* global angular, TweenMax, Sine */

angular.module('rydaly').directive('drawSvg', function($timeout) {

  function drawSvgLink(scope, element) {
    var svgObj = angular.element(element),
        paths = [],
        i = 0,
        j = 12,
        len = 0;

    paths = svgObj[0].getElementsByTagName("path");
    len = paths.length;

    $timeout(function() {
      for(i; i < len; i++) {
        var pathLength = paths[i].getTotalLength();
        paths[i].style.strokeDasharray = pathLength;
        paths[i].style.strokeDashoffset = pathLength;
        paths[i].style.opacity = 0;
        paths[i].getBoundingClientRect();
        j--;

        TweenMax.to( paths[i], j / 1.5, {
          css:{
            strokeDashoffset: 0,
            opacity: 1
          }, ease: Sine.easeOut, delay: 1 + (i / 5)
        });

        TweenMax.to( paths[i], 2, {
          css: {
            fillOpacity: 1,
            strokeOpacity: 0
          }, delay: 3, ease: Sine.easeOut
        });
      }
    });
  }

  return {
    restrict: 'A',
    link: drawSvgLink
  };
});
