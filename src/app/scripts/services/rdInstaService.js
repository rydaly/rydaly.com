'use strict';

/* global angular */

angular.module('rydaly')
  .factory('InstagramAPI', function($http, $q, $cacheFactory) {
    var instaCache = $cacheFactory('Insta'),
        clientId = '64fd2bad18b54c679ade2d65701685bc',
        userId = '180011549';
    
    return {
      numImages: 16,
      allCached: function() {
        var cache = instaCache.get('InstaCache');
        var deferred = $q.defer();

        if(cache) {
          // grab from cache
          deferred.resolve(cache);
        } else {
          var endPoint = 'https://api.instagram.com/v1/users/' + userId + '/media/recent/?';
              endPoint += '?count=' + this.numImages + "'";
              endPoint += '&client_id=' + clientId;
              endPoint += '&callback=JSON_CALLBACK';
          
          // grab from API
          $http.jsonp(endPoint, { cache:true })
            .success(function(data) {
              // store to cache
              instaCache.put('InstaCache', data);
              deferred.resolve(data);
            });
        }
        return deferred.promise;
      }
    };
  });