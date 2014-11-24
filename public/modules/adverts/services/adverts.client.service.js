'use strict';

//Adverts service used to communicate Adverts REST endpoints
angular.module('adverts')
.factory('Adverts', ['$resource', function($resource) {
	return $resource('adverts/:advertId', {
		advertId: '@_id'
	}, {
		update: {
			method: 'PUT'
		}
	});
}
])
.factory('AdvertsByIdMap', ['$resource', function($resource) {
	return $resource('adverts/:advertIdMap', {
		advertIdMap: '@id_map'
	}, {
		update: {
			method: 'PUT'
		}
	});
}
])
.factory('d3', ['$window',
function($window) {
	return $window.d3;
}])
.factory('_', ['$window',
function($window) {
	return $window._;
}])
.factory('$', ['$window',
function($window) {
	return $window.$;
}])
.factory('shapes', ['$window',
function($window) {
	return $window.shapes;
}]);
