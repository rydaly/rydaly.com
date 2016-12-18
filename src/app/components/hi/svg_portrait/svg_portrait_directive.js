'use strict';
/* global angular */

angular.module('rydaly')
  .directive('svgPortrait', function() {
    return {
      scope: true,
      templateUrl: 'app/components/hi/svg_portrait/svg_portrait.html'
    };
  });
