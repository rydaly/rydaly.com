'use strict';
/* global angular */

/**
 *
 *  Sets image to be used for HTML5 video 'poster' attribute
 *
 */

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
