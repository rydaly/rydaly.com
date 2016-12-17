'use strict';
/* global angular */

var menuIsOpen = false;

angular.module('rydaly')
  .directive('rdNavScroll', RdNavScroll);

/* Show / hide nav on scroll */
function RdNavScroll($window, $document, $interval, $timeout, $rootScope) {
  return function() {
    var navEl,
      didScroll,
      lastScrollTop = 0,
      navbarHeight = 60, // TODO :: get this based on div height
      delta = 10;

    $timeout(initScroll, 250);

    function initScroll() {
      navEl = angular.element($document[0].getElementById('main-nav'));

      angular.element($window).bind('scroll', function() {
        didScroll = true;
      });

      $interval(function() {
        if (didScroll) {
          hasScrolled();
          didScroll = false;
        }
      }, 250);
    }

    function hasScrolled() {
      var yOffset = $window.pageYOffset;

      // Make sure they scroll more than delta and menu is not open
      if (Math.abs(lastScrollTop - yOffset) <= delta || menuIsOpen) {
        return;
      }

      if (yOffset > navbarHeight) {
        navEl.addClass('nav-opaque');
      } else {
        navEl.removeClass('nav-opaque');
      }

      // If they scrolled down and are past the navbar, add class .nav-up.
      // This is necessary so you never see what is "behind" the navbar.
      if (yOffset > lastScrollTop && yOffset > navbarHeight) {
        navEl.addClass('nav-up').removeClass('nav-down');
      } else {
        // Make sure the scroll is user input ( not javascript scrollTo )
        if ($rootScope.isAutomaticScroll === true) {
          return;
        } else {
          navEl.addClass('nav-down').removeClass('nav-up');
        }
      }

      lastScrollTop = yOffset;
    }
  };
}
