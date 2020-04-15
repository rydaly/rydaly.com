'use strict';

angular.module('rydaly')
  .controller('ContactFormController', ContactFormController);

function ContactFormController($scope, $http) {

  var contactCtrl = this;
  contactCtrl.formData = {};
  contactCtrl.errorName = '';
  contactCtrl.submission = false;
  contactCtrl.isError = false;

  var param = function(data) {

    var returnString = '',
      d;

    for (d in data) {
      if (angular.isDefined(data.d))
        returnString += d + '=' + data[d] + '&';
    }

    return returnString.slice(0, returnString.length - 1);
  };

  contactCtrl.sendMessage = function() {
    $http({
        method: 'POST',
        url: 'https://rydaly.com/php/processContactForm.php',
        data: param(contactCtrl.formData),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      })
      .then(function(response) {
        var data = response.data;

        if (!data.success) {
          contactCtrl.errorName = data.errors.name;
          contactCtrl.errorEmail = data.errors.email;
          contactCtrl.errorTextarea = data.errors.message;
          contactCtrl.submissionMessage = data.messageError;
          contactCtrl.isError = true;
          contactCtrl.submission = true; // show error message
        } else {
          contactCtrl.errorName = null;
          contactCtrl.errorEmail = null;
          contactCtrl.errorTextarea = null;
          contactCtrl.submissionMessage = data.messageSuccess;
          contactCtrl.isError = false;
          contactCtrl.submission = true; // show success message
          contactCtrl.formData = {}; // empty form fields
        }

      }, function(error) {
        console.warn('Error processing form :: ', error);
        contactCtrl.isError = true;
        contactCtrl.submissionMessage = "Uh oh, something went wrong. Please try again!";
      });
  }
}
