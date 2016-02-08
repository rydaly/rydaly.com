'use strict';

angular.module('rydaly')
  .factory('SkillsDataService', function($http) {
    var url = 'data/skills.json';
    return $http.get(url);
  })
  .factory('SkillsEventService', function($rootScope) {
    var skillsEventService = {};

    skillsEventService.message = '';

    skillsEventService.initBroadcast = function(msg, data) {
      this.message = msg;
      this.data = data;
      this.broadcast();
    };

    skillsEventService.broadcast = function() {
      $rootScope.$broadcast('handleBroadcast');
    };

    return skillsEventService;
  });