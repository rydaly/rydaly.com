'use strict';
/* global angular */

angular.module('rydaly')
  .controller('HiController', HiController);

function HiController($window, modals) {
  var hiCtrl = this;

  hiCtrl.modalContentObj = {
    items: [{
      name: 'Kimchi!',
      img: 'assets/images/kimchi.jpg'
    }, {
      name: 'Pickle!',
      img: 'assets/images/pickle.jpg'
    }]
  };

  hiCtrl.showModal = function(item) {
    // The .open() method returns a promise that will be either
    // resolved or rejected when the modal window is closed.
    var promise = modals.open(
      "simple", {
        content: item
      }
      // add more modal types here...
    );

    promise.then(
      function handleResolve(response) {
        console.log("Modal resolved :: ", response);
      },
      function handleReject(error) {
        console.warn("Modal rejected :: ", error);
      }
    );
  }
}
