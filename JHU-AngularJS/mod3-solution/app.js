(function () {
'use strict';


angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItems);

function FoundItems() {
	var ddo = {
		restrict: 'E',
		templateUrl: 'foundItems.html',
		scope: {
			items: '<',
			onRemove: '&'
		}
	};
	return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrow = this;
  var found = [];
  var searchTerm = "";
  var message = "";

  narrow.found = MenuSearchService.getFoundItems();

	narrow.getMatchedMenuItems = function () {
		if (narrow.searchTerm == null || narrow.searchTerm == "") {
			narrow.message = "Nothing found";
			narrow.found = [];
		} else {
			// getMatchedMenuItems returns a promise containing the search results
			MenuSearchService.getMatchedMenuItems(narrow.searchTerm)
			.then(function(response) {
				narrow.found = response;
				if (narrow.found.length == 0) {
					narrow.message = "Nothing found";
				} else {
					narrow.message = "";
				}
			}).catch(function(error){
				console.log("error: " + error);
			});
		}
	};

	narrow.removeItem = function (itemIndex) {
		MenuSearchService.removeItem(itemIndex);
	};

}


// ***********************************************
// MenuSearchService starts here
// ***********************************************

MenuSearchService.$inject = ['$http']
function MenuSearchService($http) {
  var service = this;
  var found = [];
  // var foundItems = [];

  service.getMatchedMenuItems = function (searchTerm) {
  	found = [];

  	return $http({
  		method: "GET",
  		url: ("http://davids-restaurant.herokuapp.com/menu_items.json")
  	}).then(function (result) {
  		// var foundItems = [];
  		searchTerm = searchTerm.toLowerCase().trim();
  		for (var counter = 0; counter < result.data.menu_items.length; counter++) {
  			if (result.data.menu_items[counter].description.toLowerCase().indexOf(searchTerm) != -1) {
  				found.push(result.data.menu_items[counter]);
  			}
  		}
  		return found;
  	},
  	function (error) {
  		console.log("error: " + error);
  	});
  }

  service.getFoundItems = function () {
		return found;
	}

	service.removeItem = function (itemIndex) {
    found.splice(itemIndex, 1);
  };

}


})();