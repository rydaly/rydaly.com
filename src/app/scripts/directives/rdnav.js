'use strict';
/* global angular */

var menuIsOpen = false;

angular.module('rydaly')
  .directive('rdNav', RdNav)
  .directive('rdNavScroll', RdNavScroll);

  function RdNav($document, $timeout) {
    var mobileMenu,
        fullMenu,
        navItems;

    function rdNav(scope) {
      $timeout(initDom);

      function initDom() {
        mobileMenu = angular.element($document[0].getElementById('js-centered-navigation-mobile-menu'));
        fullMenu = angular.element($document[0].getElementById('js-centered-navigation-menu'));
        navItems = angular.element($document[0].getElementsByClassName('navbar-item'));
        initMenu();
      }

      scope.toggleMenu = function() {
        mobileMenu.toggleClass('active');
        fullMenu.toggleClass('show');
        if(menuIsOpen) {
          fullMenu.addClass('hide');
          removeHide();
        }
        menuIsOpen = !menuIsOpen;
      };

      function initMenu() {
        navItems.bind('click', function() {
          if(menuIsOpen) scope.toggleMenu();
        });
      }
    }

    function removeHide() {
      $timeout(function() {
        fullMenu.removeClass('hide');
      }, 300);
    }

    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'app/views/partials/nav.html',
      link: rdNav
    };
  }

  /* Show / hide nav on scroll */
  function RdNavScroll($window, $document, $interval, $timeout, $rootScope) {
    return function() {

      var navEl,
          didScroll,
          lastScrollTop = 0,
          navbarHeight = 60,
          delta = 10;

      $timeout(initScroll, 250);

      function initScroll() {
        navEl = angular.element($document[0].getElementById('main-nav'));

        angular.element($window).bind('scroll', function() {
          didScroll = true;
        });

        $interval(function() {
          if(didScroll) {
            hasScrolled();
            didScroll = false;
          }
        }, 250);
      }

      function hasScrolled() {
        var st = $window.pageYOffset;

        // Make sure they scroll more than delta and menu is not open
        if( Math.abs(lastScrollTop - st) <= delta || menuIsOpen) {
          return;
        }

        if(st > navbarHeight) {
          navEl.addClass('nav-opaque');
        } else {
          navEl.removeClass('nav-opaque');
        }

        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight) {
          navEl.addClass('nav-up').removeClass('nav-down');
        } else {
          // Make sure the scroll is user input ( not javascript scrollTo )
          if($rootScope.isAutomaticScroll === true) {
            return;
          } else {
            navEl.addClass('nav-down').removeClass('nav-up');
          }
        }

        lastScrollTop = st;
      }
    };
  }
