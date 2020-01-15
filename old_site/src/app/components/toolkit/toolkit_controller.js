'use strict';
/* global angular */

angular.module('rydaly')
  .controller('ToolkitController', ToolkitController);

function ToolkitController(ToolkitService, ToolkitEventService, $timeout) {
  var toolkitCtrl = this;
      toolkitCtrl.isCollapsed = true;

  ToolkitService.success(function(data) {
    $timeout(function() {
      ToolkitEventService.initBroadcast('initd3', data);
    }, 250);
  });

  toolkitCtrl.explode = function() {
    toolkitCtrl.isCollapsed = false;
    ToolkitEventService.initBroadcast('explode');
  };

  // toolkitCtrl.collapse = function() {
  //   toolkitCtrl.isCollapsed = true;
  //   ToolkitEventService.initBroadcast('collapse');
  // };
}
