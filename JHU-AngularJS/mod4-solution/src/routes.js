(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');  

	$stateProvider

	// home page
	.state('home', {
		url: '/',
		templateUrl: 'src/templates/home.template.html'
	})

	// dipslay all categories
	.state('categories', {
		url: '/categories',
		templateUrl: 'src/templates/categories.template.html',
		controller: 'CategoriesController as catList',
		resolve: {
			categories: ['MenuDataService', function(MenuDataService) {    
				return MenuDataService.getAllCategories();              
			}]
		}
	})

	// display all items for a selected category
	.state('items', {
		url: '/items/{categoryShortName}',
		templateUrl: 'src/templates/items.template.html',
		controller: 'ItemsController as itemList',
		resolve: {
			items: ['$stateParams', 'MenuDataService', 
							function($stateParams, MenuDataService) {       
							return MenuDataService.getItemsForCategory($stateParams.categoryShortName);    
			}]
		}
	});

}

})();
