'use strict';

angular
  .module('rydaly')
  .controller('InstaFeedController', InstaFeedController)
  .filter('trusted', function($sce) {
    return function(url) {
      return $sce.trustAsResourceUrl(url);
    };
  });

function InstaFeedController(InstagramAPI) {
  var instaCtrl = this;

  instaCtrl.data = {};
  instaCtrl.items = [];

  InstagramAPI.allCached()
    .then(function(response) {
      console.log(response);
      var i,
        data = response.data,
        numImages = InstagramAPI.numImages;

      for (i = 0; i < numImages; i++) {
        if (angular.isDefined(data[i].videos)) {
          instaCtrl.items.push({
            url: data[i].videos.low_resolution.url,
            link: data[i].link,
            isImage: false
          });
        } else {
          instaCtrl.items.push({
            url: data[i].images.low_resolution.url,
            link: data[i].link,
            isImage: true
          });
        }
      }
    });
}
