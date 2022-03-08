(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
	$scope.lunchList = "";
	$scope.feedback = "";
	$scope.fontColor = "black";
	$scope.borderColor = "black";

	$scope.checkList = function () {
		// parse the list based on commas
		var parsedItems = parseList($scope.lunchList);

		// get the count for actual (non-empty) items
		var itemCount = countRealItems(parsedItems);

		// set the feedback message based on the count of real items 
		$scope.feedback = setFeedback(itemCount);
	}

	function parseList (string) {
		// split the list based on commas
		const items = string.split(",");
		return items;
	}

	function countRealItems (arrayOfItems) {
		// count and return the number of items that are not empty
		var realCount = 0;
		for (const item in arrayOfItems) {
			if (arrayOfItems[item].trim()) {
				realCount++;
			}
		}
		return realCount;
	}

	function setFeedback(realItems) {
		// set the feedback message based on the number of real items
		var feedbackMessage = "";
		if (realItems == 0) {
			feedbackMessage = "Please enter data first";
			$scope.fontColor = "red";
			$scope.borderColor = "red";
		} else if (realItems > 3) {
			feedbackMessage = "Too much!";
			$scope.fontColor = "green";
			$scope.borderColor = "green";
		} else {
			feedbackMessage = "Enjoy!";
			$scope.fontColor = "green";
			$scope.borderColor = "green";
		}
		return feedbackMessage;
	};
};
})();
