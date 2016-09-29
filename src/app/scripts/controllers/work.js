'use strict';

/* global angular */

angular.module('rydaly')
  .controller('WorkController', WorkController);

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
        pngSeq: item.hasOwnProperty('imgsSeq'),
        imgsSeq: item.imgsSeq,
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
