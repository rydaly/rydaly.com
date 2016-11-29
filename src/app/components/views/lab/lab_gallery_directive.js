'use strict';
/* global angular */

angular.module('rydaly')
  .directive('labGallery', function($interval) {

    var labGallery = function(scope, element) {
      var imgs,
        timer,
        numImgs,
        curImg = 0;

      scope.$on('onLabExpand', function (event, data) {
        // console.log('Expansion :: ', data);

        var curGallery,
          prevGallery,
          curHasGallery,
          prevHasGallery,
          expandCase;

        if(data.prevExpanded !== '') {
          prevGallery = data.prevExpanded[0].getElementsByClassName('lab-gallery');
          prevHasGallery = (prevGallery && prevGallery.length > 0) ? true : false;
        }

        curGallery = data.curExpanded[0].getElementsByClassName('lab-gallery');
        curHasGallery = (curGallery && curGallery.length > 0) ? true : false;
        expandCase = data.expandCase;

        if(prevHasGallery) killAnimation();

        if(curHasGallery && expandCase === 'COLLAPSE_ONLY') {
          killAnimation();
        } else if(curHasGallery) {
          imgs = element[0].getElementsByClassName('lab-gallery-img');
          numImgs = imgs.length;
          startAnimation();
        }
      });

      var startAnimation = function() {
        doFade();
        timer = $interval(function() {
          doFade();
        }, 2500);
      };

      var killAnimation = function() {
        $interval.cancel(timer);
        imgs = null;
        numImgs = 0;
        curImg = 0;
        timer = undefined;
        curImg = 0;
      };

      var doFade = function() {
        // console.log('curImg :: ', curImg, ' of ', numImgs);
        for(var i = 0; i < numImgs; i++) {
          if(i === curImg) {
            imgs[i].style.zIndex = 0;
            imgs[i].style.opacity = 1;
          } else {
            imgs[i].style.zIndex = -1;
            imgs[i].style.opacity = 0;
          }
        }

        curImg = (curImg !== numImgs - 1) ? curImg+=1 : 0;
      };
    };

    return {
      scope: {},
      replace: false,
      restrict: 'E',
      link: labGallery
    };
  });
