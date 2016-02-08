'use strict';
/* global angular */

angular.module('rydaly')
  .directive('rdVidPoster', RdVidPoster);

function RdVidPoster() {
  function rdVidPoster(scope, element, attrs) {
    angular.element(element).attr('poster', attrs.rdVidPoster);
  }

  return {
    restrict: 'A',
    scope: '=',
    link: rdVidPoster
  };
}