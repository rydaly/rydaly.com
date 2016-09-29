'use strict';
/* global angular, TweenMax */

angular.module('rydaly')
  .directive('rdPngSeq', function($timeout) {
    function pngSeq(scope, element, attrs) {
      // console.log(scope.img.timeline);
      var loading = angular.element(element).parent().parent()[0].getElementsByClassName('loading')[0];
      var timer = null;

      var animate = function(img, timeline, domEl) {
        var fallbackEl = angular.element(domEl).parent()[0].getElementsByClassName('anim-png-fallback')[0];
        fallbackEl.remove();

        var i = 0;
        var run_time = 0;

        for (var j = 0; j < timeline.length - 1; ++j) {
          run_time += timeline[j].delay;
        }

        var f = function() {
          var frame = i++ % timeline.length;
          var delay = attrs.timelineDelay;
          var blits = timeline[frame].blit;
          var ctx = domEl.getContext('2d');

          for (j = 0; j < blits.length; ++j) {
            var blit = blits[j];
            var sx = blit[0];
            var sy = blit[1];
            var w = blit[2];
            var h = blit[3];
            var dx = blit[4];
            var dy = blit[5];
            ctx.drawImage(img, sx, sy, w, h, dx, dy, w, h);
          }

          timer = $timeout(f, delay);
        }

        if (timer) {
          $timeout.cancel(timer);
        }

        f();
      }

      var animFallback = function(img, timeline, domEl) {
        domEl.remove(); // remove canvas el
      }

      function setAnimation(imgUrl, timeline) {
        var img = new Image();
        img.onload = function() {
          var canvas = element[0];

          // remove loading spinner
          TweenMax.to(loading, 0.3, { autoAlpha:0, onComplete: function() {
            loading.remove();
          }});

          if (canvas && canvas.getContext) {
            animate(img, timeline, canvas);
          } else {
            animFallback(img, timeline, element[0]);
          }
        }
        img.src = imgUrl;
      }

      setAnimation(attrs.rdPngSeq, scope.img.timeline);

      scope.$on("$destroy", function() {
        $timeout.cancel( timer );
      });
    }

    return {
      restrict: 'A',
      scope: '=',
      link: pngSeq
    };
  });
