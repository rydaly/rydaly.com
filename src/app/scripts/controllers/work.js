'use strict';
/* global angular */

angular.module('rydaly')
  .controller('WorkController', WorkController)
  .controller('OverlayController', OverlayController)
  .service('modals', ModalsService)
  .directive('rdOverlay', RdOverlay);

function WorkController(WorkItemsService, modals, $sce) {
  var workCtrl = this;
      workCtrl.items = [];
      workCtrl.filters = {};

  var ytQueryStr = '?vq=hd1080&modestbranding=1&rel=0&showinfo=0&color=white';

  WorkItemsService.success(function(data) {
    var i = 0,  
        numItems = data.items.length;
    
    for(i; i < numItems; i++) {
      data.items[i].loading = true;
      data.items[i].itemIdx = i;
      workCtrl.items.push(data.items[i]);
    }
  });

  workCtrl.hasVideo = function(item) {
    return item.hasOwnProperty('ytid');
  };

  // I open a modal.
  workCtrl.showModal = function(item) {
    // The .open() method returns a promise that will be either 
    // resolved or rejected when the modal window is closed.
    var promise = modals.open( 
      "overlay", 
      {
        title: item.title,
        description: item.description,
        imgLogo: item.imgLogo,
        subItems: item.subItems,
        itemImagesHi: item.imgsHi,
        itemImagesLow: item.imgsLow,
        hasVideo: item.hasOwnProperty('ytid'),
        ytid: $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + item.ytid + ytQueryStr),
        itemRoles: item.role,
        itemCta: item.link,
        itemCtaText: item.linkText
      }
      // add more modal types here... 
    );
    promise.then(
      function handleResolve( response ) {
        // console.log( "Alert resolved." );
      },
      function handleReject( error ) {
        // console.warn( "Alert rejected!" );
      }
    );
  };
}

// TODO :: bust this out to its own file | use controllerAs syntax
function OverlayController($scope, $window, modals) {
  $scope.title = modals.params().title;
  $scope.description = modals.params().description;
  $scope.imgLogo = modals.params().imgLogo;
  $scope.subItems = modals.params().subItems;
  $scope.itemImagesHi = modals.params().itemImagesHi;
  $scope.itemImagesLow = modals.params().itemImagesLow;
  $scope.hasVideo = modals.params().hasVideo;
  $scope.ytid = modals.params().ytid;
  $scope.itemRoles = modals.params().itemRoles;
  $scope.itemCta = modals.params().itemCta;
  $scope.itemCtaText = modals.params().itemCtaText;

  $scope.close = modals.resolve;

  // returns small images if small screen
  $scope.getSize = function(subItem) {
    var ss = $window.innerWidth < 640;
    if( subItem ) {
      if ( ss ) return subItem.imgsLow;
      return subItem.imgsHi;
    } 
    else {
      if( ss ) return $scope.itemImagesLow;
      return $scope.itemImagesHi;  
    }
  };
}

function ModalsService($rootScope, $q, $location) {
  // I represent the currently active modal window instance.
  var modal = {
    deferred: null,
    params: null
  };
  
  // Return the public API.
  return({
    open: open,
    params: params,
    resolve: resolve
  });

  // I open a modal of the given type, with the given params. If a modal 
  // window is already open, you can optionally pipe the response of the
  // new modal window into the response of the current (cum previous) modal
  // window. Otherwise, the current modal will be rejected before the new
  // modal window is opened.
  function open( type, params ) {
    // var previousDeferred = modal.deferred;
    // Setup the new modal instance properties.
    modal.deferred = $q.defer();
    modal.params = params;
    $location.path('/overlay');
    // We're going to pipe the new window response into the previous 
    // window's deferred value.
    // if ( previousDeferred && pipeResponse ) {
    //   modal.deferred.promise
    //     .then( previousDeferred.resolve, previousDeferred.reject )
    //   ;
    // We're not going to pipe, so immediately reject the current window.
    // } else if ( previousDeferred ) {
    //   previousDeferred.reject();
    // }
    // Since the service object doesn't (and shouldn't) have any direct
    // reference to the DOM, we are going to use events to communicate 
    // with a directive that will help manage the DOM elements that 
    // render the modal windows.
    // --
    // NOTE: We could have accomplished this with a $watch() binding in
    // the directive; but, that would have been a poor choice since it
    // would require a chronic watching of acute application events.
    $rootScope.$emit( "modals.open", type );
    return( modal.deferred.promise );
  }
  // I return the params associated with the current params.
  function params() {
    return( modal.params || {} );
  }
  // I open a modal window with the given type and pipe the new window's
  // response into the current window's response without rejecting it 
  // outright.
  // --
  // This is just a convenience method for .open() that enables the 
  // pipeResponse flag; it helps to make the workflow more intuitive. 
  // function proceedTo( type, params ) {
  //   return( open( type, params, true ) );
  // }
  // I reject the current modal with the given reason.
  // function reject( reason ) {
  //   if ( ! modal.deferred ) {
  //     return;
  //   }
  //   modal.deferred.reject( reason );
  //   modal.deferred = modal.params = null;
  // //   // Tell the modal directive to close the active modal window.
  //   $rootScope.$emit( "modals.close" );
  // }
  // I resolve the current modal with the given response.
  function resolve( response ) {
    if ( ! modal.deferred ) {
      return;
    }         
    modal.deferred.resolve( response );
    modal.deferred = modal.params = null;
    // Tell the modal directive to close the active modal window.
    $rootScope.$emit( "modals.close" );
  }
}

function RdOverlay($rootScope, modals, $document, $timeout, $location) {
  return( link );
  // I bind the JavaScript events to the scope.
  function link( scope, element ) {
    // get container so we can disable scrolling on the background element when open
    scope.container = angular.element($document[0].body);
    // TODO :: get the modal also so we can set overflow hidden on close ( prevent double scroll bars )
    // scope.overlayContain = angular.element(element);
  
    // I define which modal window is being rendered. By convention, 
    // the subview will be the same as the type emitted by the modals
    // service object.
    scope.subview = null;
    // If the user clicks directly on the backdrop (ie, the modals 
    // container), consider that an escape out of the modal, and reject
    // it implicitly.
    element.on(
      "click",
      function handleClickEvent( event ) {
        if ( element[ 0 ] !== event.target ) {
          return;
        }
        
        scope.$apply( modals.reject );
      }
    );

    // Listen for "open" events emitted by the modals service object.
    $rootScope.$on("modals.open", handleModalOpenEvent);
    
    function handleModalOpenEvent( event, modalType ) {
      // console.log(modalType);
      scope.subview = modalType;
      scope.container.addClass("overlay-open");
    }

    // Listen for "close" events emitted by the modals service object.
    $rootScope.$on("modals.close", handleModalCloseEvent);

    function handleModalCloseEvent() {
      scope.subview = null;
      $location.path('/work');
      $timeout( function() {  
        scope.container.removeClass("overlay-open");
      }, 300);
    }
  }
}