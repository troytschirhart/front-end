(function () {
'use strict';

angular.module('ShoppingListCheckOff',[])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)
.filter('angularBucks', AngularBucksFilter);

ToBuyController.$inject = ['ShoppingListCheckOffService','angularBucksFilter'];
function ToBuyController(ShoppingListCheckOffService, angularBucksFilter) {
  var toBuy = this;

  toBuy.toBuyList = ShoppingListCheckOffService.getToBuyList();

  toBuy.checkToBuyLength = function () {
    return ShoppingListCheckOffService.checkToBuyLength();
  };

  toBuy.buyItem = function (itemIndex) {
    ShoppingListCheckOffService.buyItem(itemIndex);
  };

}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService', 'angularBucksFilter'];
function AlreadyBoughtController(ShoppingListCheckOffService, angularBucksFilter) {
  var bought = this;

  bought.boughtList = ShoppingListCheckOffService.getBoughtList();

  bought.checkBoughtLength = function () {
    return ShoppingListCheckOffService.checkBoughtLength();
  };

  bought.totalItemCost = function (quantity, pricePerItem) {
    var totalCost = ShoppingListCheckOffService.totalItemCost(quantity, pricePerItem);
    totalCost = angularBucksFilter(totalCost);
    return totalCost;
  };

}

function ShoppingListCheckOffService() {
  var service = this;

  var toBuyList = [
    {
      name : "cookies",
      quantity : 10,
      pricePerItem : 2
    },
    {
      name : "donuts",
      quantity : 12,
      pricePerItem : 1.25
    },
    {
      name : "cupcakes",
      quantity : 20,
      pricePerItem : 1.45
    },
    {
      name : "candy bars",
      quantity : 15,
      pricePerItem : 2.5
    },
    {
      name : "antacids",
      quantity : 100,
      pricePerItem : .15
    }
  ];

  var boughtList = [];

  service.getToBuyList = function () {
    return toBuyList;
  };

  service.getBoughtList = function () {
    return boughtList;
  };

  service.buyItem = function (itemIndex) {
    var boughtItem ={
      name: "",
      quantity: 0,
      pricePerItem: 0
    };
    boughtItem.name = toBuyList[itemIndex].name;
    boughtItem.quantity = toBuyList[itemIndex].quantity;
    boughtItem.pricePerItem = toBuyList[itemIndex].pricePerItem;
    boughtList.push(boughtItem);
    toBuyList.splice(itemIndex, 1);
  };

  service.checkToBuyLength = function () {
    return (toBuyList.length == 0);
  };

  service.checkBoughtLength = function () {
    return (boughtList.length == 0);
  };

  service.totalItemCost = function (quantity, pricePerItem) {
    return quantity * pricePerItem;
  }

}

function AngularBucksFilter () {
  return function (input) {
    var angularDollars = "$$$" + parseFloat(Math.round(input * 100) / 100).toFixed(2);
    return angularDollars;
  }
}

})();
