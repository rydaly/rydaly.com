'use strict';
/* global angular */

var menuIsOpen = false;

angular.module('rydaly')
  .directive('rdNav', RdNav);

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
      if (menuIsOpen) {
        fullMenu.addClass('hide');
        removeHide();
      }
      menuIsOpen = !menuIsOpen;
    };

    function initMenu() {
      navItems.bind('click', function() {
        if (menuIsOpen) scope.toggleMenu();
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
    templateUrl: 'app/shared/nav/nav.html',
    link: rdNav
  };
}
