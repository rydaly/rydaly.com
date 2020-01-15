'use strict';
/* global angular, TweenMax, Quint */

angular.module('rdExpander', [])
  .directive('rdExpandPreview', RdExpandPreview);

function RdExpandPreview($window, $document, $timeout, $rootScope) {

  var rdExpandPreview = function($scope) {
    var expandCases = [
          'EXPAND_ONLY',
          'COLLAPSE_ONLY',
          'FADE_ONLY',
          'COLLAPSE_AND_EXPAND',
          'COLLAPSE_AND_FILTER'
        ],
        curExpandCase = '',
        prevExpanded = '',
        prevExpandedContent = '',
        curExpanded = '',
        curExpandedContent = '',

        // config
        defaultDuration = 0.35,
        defaultEase = Quint.easeInOut,
        gridItemHeight = 250,
        expandPadding = 10,
        smallBreakPoint = 520,
        mediumBreakPoint = 640;

    // wait for $digest completion
    $scope.$evalAsync(function() {
      // grid = $document[0].getElementById('grid-container');
      init();
    });

    function init() {
      curExpandCase = expandCases[0];
    }

    /* =============================================================== */

    $scope.handleItemTouch = function(e) {
      e.preventDefault();

      var thisEl = e.currentTarget,
          thisParent = angular.element(thisEl.parentNode),
          expanded = thisParent[0].getElementsByClassName('img-expanded');

      // do nothing if clicked item is already expanded
      if(thisParent.hasClass('is-expanded')) {
        return;
      }

      // if there's an open expander
      if(prevExpanded !== '') {
        if(thisParent[0].offsetTop === prevExpanded[0].offsetTop) {
          // same row - FADE_ONLY
          curExpandCase = expandCases[2];
        } else {
          // new row - COLLAPSE_AND_EXPAND
          curExpandCase = expandCases[3];
        }
      } else {
        // no expander open - EXPAND_ONLY
        curExpandCase = expandCases[0];
      }

      // set current expansion
      curExpanded = thisParent;
      curExpandedContent = expanded;

      // do the expansion and broadcast event
      handleExpand(thisEl, curExpandCase);

      // set previous expansion
      prevExpanded = curExpanded;
      prevExpandedContent = curExpandedContent;
    };

    $scope.handleCloseBtnTouch = function(e) {
      e.preventDefault();

      var thisEl = angular.element(e.target);

      // if it's a filter link
      if(thisEl.hasClass('filter-link')) {
        curExpandCase = expandCases[4];
      } else {
        curExpandCase = expandCases[1];
      }

      handleExpand(null, curExpandCase);
    };

    $scope.handlePlayBtnTouch = function(e) {
      e.preventDefault();

      var thisEl = angular.element(e.currentTarget),
          vid = angular.element(e.currentTarget.parentNode.parentNode)[0].getElementsByClassName('vid-lrg')[0];

      vid.play();
      TweenMax.to(thisEl, 0.3, { css:{ opacity: 0 }});
    };

    /* =============================================================== */

    function handleExpand(thisEl, expandCase) {

      var winWidth = $window.innerWidth,
          calcHeight;

      $rootScope.isAutomaticScroll = true;

      $scope.$broadcast('onLabExpand', {
        curExpanded: curExpanded,
        prevExpanded: prevExpanded,
        expandCase: expandCase
      });

      // get expand case based on screen size
      function getCalcHeightCase() {
        if(winWidth <= smallBreakPoint) {
          calcHeight = curExpandedContent[0].offsetHeight + expandPadding;
        }
        else if(winWidth > smallBreakPoint && winWidth <= mediumBreakPoint) {
          calcHeight = curExpandedContent[0].offsetHeight + gridItemHeight + expandPadding;
        }
        else {
          calcHeight = curExpandedContent[0].offsetHeight + gridItemHeight + expandPadding;
        }
      }

      // handle expansion based on case
      switch(expandCase) {
        case 'EXPAND_ONLY' :

          // console.log('EXPAND_ONLY');

          curExpanded.addClass('is-expanded');

          delayScrollTo(thisEl);

          // set height to auto
          TweenMax.set(curExpandedContent, { css:{ height: 'auto' } });

          // get height for curExpanded based on auto height of content and screen size
          getCalcHeightCase();

          // immediately tween from 0 to auto
          TweenMax.from(curExpandedContent, defaultDuration, { css:{ height: 0 }, ease: defaultEase });

          // tween curExpanded based on calculated height
          TweenMax.to(curExpanded, defaultDuration, { css:{ height: calcHeight }, ease:defaultEase });

          break;

        case 'COLLAPSE_ONLY' :

          // console.log('COLLAPSE_ONLY');

          prevExpanded.removeClass('is-expanded');

          TweenMax.to(prevExpandedContent, defaultDuration, { css:{ height: 0 }, ease:defaultEase });
          TweenMax.to(prevExpanded, defaultDuration, { css:{ height: gridItemHeight }, ease:defaultEase, onComplete: function() {
            $timeout(function() {
              $rootScope.isAutomaticScroll = false;
            }, 250);
          }});

          killVidPlayer(prevExpanded);

          // clear previous
          prevExpanded = '';

          break;

        case 'FADE_ONLY' :

          // console.log('FADE_ONLY');

          TweenMax.killDelayedCallsTo(setCollapse);

          curExpanded.addClass('is-expanded');
          prevExpanded.removeClass('is-expanded');

          //set collapse
          TweenMax.delayedCall(defaultDuration+0.1, setCollapse, [ prevExpandedContent, prevExpanded ]);

          delayScrollTo(thisEl);

          // set height to auto
          TweenMax.set(curExpandedContent, { css:{ height: 'auto' } });

          // get height for curExpanded based on auto height of content and screen size
          getCalcHeightCase();

          // set curExpanded based on calculated height
          TweenMax.set(curExpanded, { css:{ height: calcHeight } });

          killVidPlayer(prevExpanded);

          break;

        case 'COLLAPSE_AND_EXPAND' :

          // console.log('COLLAPSE_AND_EXPAND');

          curExpanded.addClass('is-expanded');
          prevExpanded.removeClass('is-expanded');

          // animate collapse
          TweenMax.to(prevExpandedContent, defaultDuration, { css:{ height: 0 }, ease:defaultEase });
          TweenMax.to(prevExpanded, defaultDuration, { css:{ height: gridItemHeight }, ease:defaultEase });

          // set height to auto
          TweenMax.set(curExpandedContent, { css:{ height: 'auto' } });

          // get height for curExpanded based on auto height of content and screen size
          getCalcHeightCase();

          // immediately tween from 0 to auto
          TweenMax.from(curExpandedContent, defaultDuration, { css:{ height: 0 }, ease: defaultEase, onComplete: delayScrollTo, onCompleteParams: [thisEl]  });

          // tween curExpanded based on calculated height
          TweenMax.to(curExpanded, defaultDuration, { css:{ height: calcHeight }, ease:defaultEase });

          killVidPlayer(prevExpanded);

          break;

        case 'COLLAPSE_AND_FILTER' :

          // console.log('COLLAPSE_AND_FILTER');

          prevExpanded.removeClass('is-expanded');

          TweenMax.to(prevExpandedContent, defaultDuration, { css:{ height: 0 }, ease:defaultEase });
          TweenMax.to(prevExpanded, defaultDuration, { css:{ height: gridItemHeight }, ease:defaultEase });
          TweenMax.to($window, defaultDuration, {scrollTo:{y:90}, ease:defaultEase, delay:defaultDuration, autoKill:false, onComplete: function() {
            $timeout(function() {
              $rootScope.isAutomaticScroll = false;
            }, 250);
          }});

          killVidPlayer(prevExpanded);
          // clear previous
          prevExpanded = '';

          break;
      }
    }

    function setCollapse(prevCon, prevExpand) {
      TweenMax.set(prevCon, { css:{ height: 0 } });
      TweenMax.set(prevExpand, { css:{ height: gridItemHeight } });
    }

    /* =============================================================== */

    function killVidPlayer(prev) {

      var vidEl = prev[0].getElementsByClassName('vid-lrg');

      // if there's a video in the prev expand, stop and reset
      if(vidEl.length > 0) {
        $timeout(function() {
          vidEl[0].pause();
          vidEl[0].currentTime = 0;
        }, 300);
      }
    }

    /* =============================================================== */

    function delayScrollTo(el) {
      $rootScope.isAutomaticScroll = true;

      var elParent = angular.element(el.parentNode),
          winWidth = $window.innerWidth,
          topOffset = 0,
          elLoc;

      if(winWidth <= smallBreakPoint) {
        topOffset = 130;
      } else if(winWidth > smallBreakPoint && winWidth <= mediumBreakPoint) {
        topOffset = 380;
      } else {
        topOffset = 285;
      }

      elLoc = elParent[0].offsetTop + topOffset;

      TweenMax.to($window, defaultDuration, {scrollTo:{y:elLoc}, ease:defaultEase, delay:defaultDuration, onComplete: function() {
        $timeout(function() {
          $rootScope.isAutomaticScroll = false;
        }, 250);
      }});
    }
  };

  return {
    replace: false,
    restrict: 'E',
    link: rdExpandPreview
  };
}
