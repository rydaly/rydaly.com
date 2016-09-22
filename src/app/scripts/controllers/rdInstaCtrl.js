'use strict';

/* global angular */

angular
  .module('rydaly')
  .controller('InstaController', InstaController)
  .filter('trusted', function($sce) {
    return function(url) {
      return $sce.trustAsResourceUrl(url);
    };
  });

function InstaController(InstagramAPI) {
  var instaCtrl = this;
      instaCtrl.layout = 'grid';
      instaCtrl.data = {};
      instaCtrl.items = [];

  InstagramAPI.allCached()
    .then(function(response) {
      console.log(response);
      var i,
          data = response.data,
          numImages = InstagramAPI.numImages;

      for(i = 0; i < numImages; i++) {
        if(data[i].hasOwnProperty('videos')) {
          instaCtrl.items.push( { url: data[i].videos.low_resolution.url, link:data[i].link, isImage: false } );
        } else {
          instaCtrl.items.push( { url: data[i].images.low_resolution.url, link:data[i].link, isImage: true } );
        }
      }
    });
}
