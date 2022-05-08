(function () {
"use strict";

angular.module('common')
.service('SignupService', SignupService);


SignupService.$inject = ['$http', 'ApiPath'];
function SignupService($http, ApiPath) {
  var service = this;

  var user = {
    firstname: null,
    lastname: null,
    email: null,
    phone: null,
    favitem: null,
    favname: null,
    favdescription: null,
    validItem: false,
    signedup: false
  };

  service.getUserInfo = function () {
    return user;
  }

  service.setUserInfo = function (user) {
    user = user;
  }

  service.getFavoriteItem = function(shortName) {
    return $http.get(ApiPath + '/menu_items/' + shortName + '.json').then(function (response) {
      return response.data;
    });
  }
}


})();