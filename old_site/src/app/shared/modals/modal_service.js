'use strict';

/* global angular */

angular.module('rydaly')
  .service('modals', ModalsService);

function ModalsService($rootScope, $q) {
  // currently active modal window instance.
  var modal = {
    deferred: null,
    params: null
  };

  // return api
  return ({
    open: open,
    params: params,
    resolve: resolve
  });

  function open(type, params) {

    params.type = type;
    modal.deferred = $q.defer();
    modal.params = params;
    $rootScope.$emit("modals.open", type);
    return (modal.deferred.promise);
  }

  // return the params associated with the current params.
  function params() {
    return (modal.params || {});
  }

  // resolve the current modal with the given response.
  function resolve(response) {
    if (!modal.deferred) {
      return;
    }
    modal.deferred.resolve(response);
    modal.deferred = modal.params = null;
    // Tell the modal directive to close the active modal window.
    $rootScope.$emit("modals.close");
  }

}
