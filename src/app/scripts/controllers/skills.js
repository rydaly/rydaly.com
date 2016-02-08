'use strict';
/* global angular */

angular.module('rydaly')
  .controller('SkillsController', SkillsController);

function SkillsController(SkillsDataService, SkillsEventService, $timeout) {
  var skillsCtrl = this;
      skillsCtrl.test = 'SkillsController';
      skillsCtrl.isCollapsed = true;

  SkillsDataService.success(function(data) {
    $timeout(function() { 
      SkillsEventService.initBroadcast('initd3', data);
    }, 250);
  });

  skillsCtrl.explode = function() {
    skillsCtrl.isCollapsed = false;
    SkillsEventService.initBroadcast('explode');
  };

  // skillsCtrl.collapse = function() {
  //   skillsCtrl.isCollapsed = true;
  //   SkillsEventService.initBroadcast('collapse');
  // };
}
