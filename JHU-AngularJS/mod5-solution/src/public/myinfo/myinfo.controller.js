(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['SignupService', 'ApiPath'];
function MyInfoController(SignupService, ApiPath) {
  var myinfoCtrl = this;

  myinfoCtrl.basePath = ApiPath;

  myinfoCtrl.user = SignupService.getUserInfo();

}


})();