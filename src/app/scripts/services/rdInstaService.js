'use strict';

angular.module('rydaly')
  .factory('InstagramAPI', function($http) {

    var clientId = '64fd2bad18b54c679ade2d65701685bc',
        userId = '180011549';
    
    return {
      numImages: 16,
      getImages: function(callback) {
        var endPoint = 'https://api.instagram.com/v1/users/' + userId + '/media/recent/?';
            endPoint += '?count=' + this.numImages + "'";
            endPoint += '&client_id=' + clientId;
            endPoint += '&callback=JSON_CALLBACK';
        $http.jsonp(endPoint).success(function(response) {
          callback(response.data);
        });
      }
    };
  });