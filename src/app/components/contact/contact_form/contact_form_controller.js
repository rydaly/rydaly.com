"use strict";

angular
  .module("rydaly")
  .controller("ContactFormController", ContactFormController);

function ContactFormController($scope, $http) {
  var contactCtrl = this;
  contactCtrl.formData = {
    name: {
      id: 1175724924,
      val: "",
    },
    email: {
      id: 1209588789,
      val: "",
    },
    msg: {
      id: 993297357,
      val: "",
    },
  };
  contactCtrl.submission = false;
  contactCtrl.isError = false;

  var param = function (data) {
    var returnString = "";
    angular.forEach(data, function (value, key) {
      returnString += "&entry." + value.id + "=" + value.val;
    });

    return returnString;
  };

  contactCtrl.sendMessage = function (isValid) {
    if (isValid) {
      $http({
        method: "POST",
        url:
          "https://docs.google.com/forms/d/e/1FAIpQLSe5doHIMxTwcOyHXdEO9X82pCidMGjmbjYpM-bYWE28TEFlmQ/formResponse?" +
          param(contactCtrl.formData),
      }).then(
        function (response) {
          if (response.status === 200) {
            contactCtrl.submissionMessage =
              "Hey, thanks for reaching out! I'll get back to you soon.";
            contactCtrl.isError = false;
            contactCtrl.submission = true; // show success message
            contactCtrl.formData = {
              // empty form fields
              name: {
                id: 1175724924,
                val: "",
              },
              email: {
                id: 1209588789,
                val: "",
              },
              msg: {
                id: 993297357,
                val: "",
              },
            };
            $scope.contactForm.$setPristine(true); // reset form
          } else {
            contactCtrl.submissionMessage =
              "Uh oh, something's wrong. Please check the fields in red.";
            contactCtrl.isError = true;
            contactCtrl.submission = true; // show error message
          }
        },
        function (error) {
          if (error.status === -1) {
            contactCtrl.submissionMessage =
              "Hey, thanks for reaching out! I'll get back to you soon.";
            contactCtrl.isError = false;
            contactCtrl.submission = true; // show success message
            contactCtrl.formData = {
              // empty form fields
              name: {
                id: 1175724924,
                val: "",
              },
              email: {
                id: 1209588789,
                val: "",
              },
              msg: {
                id: 993297357,
                val: "",
              },
            };
            $scope.contactForm.$setPristine(true); // reset form
          } else {
            contactCtrl.isError = true;
            contactCtrl.submissionMessage =
              "Uh oh, something went wrong. Please try again!";
            contactCtrl.submission = true; // show error message
          }
        }
      );
    }
  };
}
