'use strict';

//Setting up route
angular.module('adverts').config(['$stateProvider',
	function($stateProvider) {
		// Adverts state routing
		$stateProvider.
		state('listAdverts', {
			url: '/adverts',
			templateUrl: 'modules/adverts/views/adverts.client.view.html'
		});
	}
]);
