(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService);

MenuDataService.$inject = ['$http']
function MenuDataService($http) {
  var service = this;
  var found = [];

  service.getAllCategories = function () {
  	return $http({
  		method: "GET",
  		url: ("https://davids-restaurant.herokuapp.com/categories.json")
  	}).then(function (result) {
  		return result.data;
  	},
  	function (error) {
  		console.log("error: " + error);
  	});
  }

	service.getItemsForCategory = function(categoryShortName) {
  	var urlString = "https://davids-restaurant.herokuapp.com/menu_items.json?category=" + categoryShortName;
  	return $http({
  		method: "GET",
  		url: (urlString)
  	}).then(function (result) {
  		return result.data;	
  	},
  	function (error) {
  		console.log("error: " + error);
  	});
	}

}


})();