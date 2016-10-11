'use strict';
/* global angular */

angular.module('rydaly')
  .controller('ToolkitController', ToolkitController);

// TODO :: rename all 'skills' to 'toolkit'
function ToolkitController(SkillsDataService, SkillsEventService, $timeout) {
  var toolkitCtrl = this;
      // toolkitCtrl.test = 'ToolkitController';
      toolkitCtrl.isCollapsed = true;

  SkillsDataService.success(function(data) {
    $timeout(function() {
      SkillsEventService.initBroadcast('initd3', data);
    }, 250);
  });

  toolkitCtrl.explode = function() {
    toolkitCtrl.isCollapsed = false;
    SkillsEventService.initBroadcast('explode');
  };

  // toolkitCtrl.collapse = function() {
  //   toolkitCtrl.isCollapsed = true;
  //   SkillsEventService.initBroadcast('collapse');
  // };
}
