'use strict';
/* global angular, TweenMax */

angular.module('rydaly')
  .directive('rdOverlay', RdOverlay);

function RdOverlay($rootScope, modals, $document, $timeout, $location) {
  return (link);
  // I bind the JavaScript events to the scope.
  function link(scope, element) {
    // get container so we can disable scrolling on the background element when open
    scope.container = angular.element($document[0].body);
    // TODO :: get the modal also so we can set overflow hidden on close ( prevent double scroll bars )
    // scope.overlayContain = angular.element(element);

    // define which modal window is being rendered. By convention,
    // the subview will be the same as the type emitted by the modals
    // service object.
    scope.subview = null;
    // If the user clicks directly on the backdrop (ie, the modals
    // container), consider that an escape out of the modal, and reject
    // it implicitly.
    element.on(
      "click",
      function handleClickEvent(event) {
        if (element[0] !== event.target) {
          return;
        }
        scope.$apply(modals.reject);
      }
    );

    // Listen for "open" events emitted by the modals service object.
    $rootScope.$on("modals.open", handleModalOpenEvent);

    function handleModalOpenEvent(event, modalType) {
      TweenMax.set(element, {
        scrollTo: {
          y: 0
        }
      });
      scope.subview = modalType;
      scope.container.addClass("overlay-open");
    }

    // Listen for "close" events emitted by the modals service object.
    $rootScope.$on("modals.close", handleModalCloseEvent);

    function handleModalCloseEvent() {
      TweenMax.set(element, {
        scrollTo: {
          y: 0
        },
        delay: 0.3
      });
      scope.subview = null;
      
      if($location.path() === '/overlay') {
        $location.path('/work');
      } else if($location.path() === '/modal') {
        $location.path('/');
      }

      $timeout(function() {
        scope.container.removeClass("overlay-open");
      }, 300);
    }
  }
}
