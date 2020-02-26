'use strict';

angular.module('rydaly')
  .controller('LabController', LabController);

function LabController(LabItemsService, $window, $sce) {
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
    }
  });

  labCtrl.getSize = function() {
    labCtrl.isLrg = $window.innerWidth < 640 ? false : true;
  }(); // run immediately

  labCtrl.isVideo = function(item) {
    return angular.isDefined(item.video);
  };

  labCtrl.isGallery = function(item) {
    return angular.isDefined(item.gallery);
  };

  labCtrl.isEmbed = function(item) {
    return angular.isDefined(item.embed);
  };

  labCtrl.getEmbed = function(item) {
    return $sce.trustAsHtml(item.embed);
  };

  labCtrl.hasLink = function(item) {
    return angular.isDefined(item.link);
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
