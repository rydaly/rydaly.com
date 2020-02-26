'use strict';
/* global TweenMax */

angular.module('rydaly')
  .directive('rdOverlay', RdOverlay);

function RdOverlay($rootScope, modals, $document, $timeout) {
  return link;

  function link(scope, element) {
    // get container so we can disable scrolling on the background element when open
    scope.container = angular.element($document[0].body);

    // define which modal window is being rendered. By convention,
    // the subview will be the same as the type emitted by the modals
    // service object.
    scope.subview = null;
    // define a class for styling that doesn't get removed on close
    scope.modalClass = null;

    // If the user clicks directly on the backdrop (ie, the modals
    // container), consider that an escape out of the modal, and return
    element.on(
      "click",
      function handleClickEvent(event) {
        if (element[0] !== event.target) {
          return;
        } else {
          $rootScope.$emit("modals.close");
          scope.$apply(modals.reject);
        }
      }
    );

    // Listen for "open" events emitted by the modals service object.
    var openListener = $rootScope.$on("modals.open", handleModalOpenEvent);
    // var v = $rootScope.$on(myEventNameConstants.scope.destroy, foo);

    function handleModalOpenEvent(event, modalType) {
      TweenMax.set(element, {
        scrollTo: {
          y: 0
        }
      });
      scope.subview = scope.modalClass = modalType;
      scope.container.addClass("overlay-open");
    }

    // Listen for "close" events emitted by the modals service object.
    var closeListener = $rootScope.$on("modals.close", handleModalCloseEvent);

    function handleModalCloseEvent() {
      TweenMax.set(element, {
        scrollTo: {
          y: 0
        },
        delay: 0.2
      });
      scope.subview = null;

      // if ($location.path() === '/overlay') {
      //   $location.path('/work');
      // } else if ($location.path() === '/modal') {
      //   $location.path('/');
      // }

      $timeout(function() {
        scope.container.removeClass("overlay-open");
      }, 200);
    }

    // cleanup listeners
    scope.$on('$destroy', function() {
        openListener();
        closeListener();
    });
  }
}
