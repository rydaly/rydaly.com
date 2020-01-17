'use strict';

/* global angular */

angular.module('rydaly')
  .factory('InstagramAPI', function($http, $q, $cacheFactory) {
    var instaCache = $cacheFactory("Insta"),
      token = "180011549.6f35121.5248952d88594802aae02056922808ae",
      clientId = "6f3512140d3a4d2097be830bf3acfd58";

    return {
      numImages: 16,
      allCached: function() {
        var cache = instaCache.get('InstaCache');
        var deferred = $q.defer();

        if (cache) {
          // grab from cache
          deferred.resolve(cache);
        } else {
          var endPoint = 'https://api.instagram.com/v1/users/self/media/recent';
          endPoint += '?count=' + this.numImages + "'";
          endPoint += '&client_id=' + clientId;
          endPoint += '&access_token=' + token;
          endPoint += '&callback=JSON_CALLBACK';

          // grab from API
          $http.jsonp(endPoint, {
              cache: true
            })
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
