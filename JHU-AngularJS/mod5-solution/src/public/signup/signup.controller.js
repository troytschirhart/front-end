(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['SignupService'];
function SignupController(SignupService) {
  var signupCtrl = this;

  signupCtrl.validItem = true;

  signupCtrl.user = SignupService.getUserInfo();

  signupCtrl.submit = function () {
  	var gotItem;
  	SignupService.getFavoriteItem(signupCtrl.user.favitem).then(function success(response) {
  		gotItem = response;
    	signupCtrl.validItem = true;
     	signupCtrl.completed = true;
     	signupCtrl.user.favname = gotItem.name;
     	signupCtrl.user.favdescription = gotItem.description;
     	signupCtrl.user.signedup = true;
    },
    function error(response) {
    	signupCtrl.validItem = false;
    	signupCtrl.completed = false;
    });
  }
}


})();