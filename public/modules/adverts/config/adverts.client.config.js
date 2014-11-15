'use strict';

// Configuring the Articles module
angular.module('adverts').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Adverts', 'adverts',2);
	}
]);
