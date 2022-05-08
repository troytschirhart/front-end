(function () {
"use strict";

angular.module('common')
.directive('favExists', FavExists);

FavExists.$inject = ['SignupService','$http', '$q' ];
function FavExists(SignupService, $http, $q) {

  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) { 
      ngModel.$asyncValidators.favExists = function(modelValue, viewValue) {
        return SignupService.getFavoriteItem(viewValue)
                .then(function success(response) {
                  var tempUser = SignupService.getUserInfo();
                  tempUser.validItem = true;
                  SignupService.setUserInfo(tempUser);
                  return true;
                },
                function error(response) {
                  var tempUser = SignupService.getUserInfo();
                  tempUser.validItem = false;
                  SignupService.setUserInfo(tempUser);
                  return $q.reject("No such menu number exists");
                });
      }
    }
  }
}

})();