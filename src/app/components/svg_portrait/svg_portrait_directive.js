'use strict';
/* global angular */

angular.module('rydaly')
  .directive('svgPortrait', function() {
    return {
      scope: true,
      templateUrl: 'app/components/svg_portrait/svg_portrait.html'
    };
  });
