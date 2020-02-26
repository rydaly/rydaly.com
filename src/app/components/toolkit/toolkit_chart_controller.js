'use strict';

angular.module('rydaly')
  .controller('ToolkitChartController', ToolkitChartController);

function ToolkitChartController($scope, ToolkitEventService) {
  $scope.$on('handleBroadcast', function() {
    $scope.handleEventBroadcast(ToolkitEventService.message, ToolkitEventService.data);
  });
}
