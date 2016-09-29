'use strict';
/* global angular, TweenMax */

angular.module('rydaly')
  .directive('rdDefer', function() {
    function defer(scope, element, attrs) {
      var loading;

      element[0].style.opacity = 0;

      if(element[0].tagName === 'SOURCE' || element[0].className === 'anim-png-fallback') {
        loading = angular.element(element).parent().parent()[0].getElementsByClassName('loading')[0];
        element[0].setAttribute('src', attrs.rdDefer);
        fade();
      }
      else {
        loading = angular.element(element).parent()[0].getElementsByClassName('loading')[0];
        element.bind('load', onPreload);
      }

      // replace the source with the actual image source and load
      function onPreload() {
        this.src = attrs.rdDefer;
        element.unbind('load', onPreload);
        element.bind('load', onImgLoad);
      }

      function onImgLoad() {
        fade();
        element.unbind('load', onImgLoad);
      }

      function fade() {
        TweenMax.to(element, 0.3, { alpha:1, delay:0.2 });

        TweenMax.to(loading, 0.3, { autoAlpha:0, onComplete: function() {
          loading.remove();
        }});
      }
    }

    return {
      restrict: 'A',
      scope: '=',
      link: defer
    };
  });
