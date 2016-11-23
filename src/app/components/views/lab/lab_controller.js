'use strict';
/* global angular */

angular.module('rydaly')
  .controller('LabController', LabController);

function LabController(LabItemsService, $window) {
  var labCtrl = this;
      labCtrl.filters = {};
      labCtrl.items = [];
      labCtrl.filtered = false;
      labCtrl.curFilter = '';
      labCtrl.isLrg = false;

  LabItemsService.success(function(data) {
    // console.log(data.items);
    var i = 0,
        numItems = data.items.length;

    for(i; i < numItems; i++) {
      data.items[i].itemIdx = i;
      labCtrl.items.push(data.items[i]);
      console.log(typeof(data.items[i].imgHi));
    }
  });

  labCtrl.getSize = function() {
    labCtrl.isLrg = $window.innerWidth < 640 ? false : true;
  }(); // run immediately

  labCtrl.isVideo = function(item) {
    return item.hasOwnProperty('video');
  };

  labCtrl.isGallery = function(item) {
    return item.hasOwnProperty('gallery');
  };

  labCtrl.hasLink = function(item) {
    return item.hasOwnProperty('link');
  };

  labCtrl.getPoster = function(item) {
    return item.imgLow;
  };

  labCtrl.handleRoleFilter = function(role) {
    labCtrl.filtered = true;
    labCtrl.filters.role = role;
    labCtrl.curFilter = 'Role: ' + role;
  };

  labCtrl.handleTagFilter = function(tag) {
    labCtrl.filtered = true;
    labCtrl.filters.tag = tag;
    labCtrl.curFilter = 'Tag: ' + tag;
  };

  labCtrl.clearFilter = function() {
    labCtrl.filters = {};
    labCtrl.filtered = false;
  };
}
