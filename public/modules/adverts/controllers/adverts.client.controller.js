'use strict';

// Adverts controller
angular.module('adverts').controller('AdvertsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Adverts',
function($scope, $stateParams, $location, Authentication, Adverts ) {
	$scope.authentication = Authentication;

	// Create new Advert
	$scope.create = function() {

		console.log($scope.advert_title);
		// Create new Advert object
		var advert = new Adverts ({
			id_map: this.advert_id_map,
			title: this.advert_title,
			surface: this.advert_surface,
			room: this.advert_room,
			price: this.advert_price,
			energetic: this.advert_energetic,
			email: this.advert_mail,
			address: this.advert_address,
			zip_code:this.advert_zip_code,
			city: this.advert_city,
			phone: this.advert_phone,
			description:this.advert_des
		});
		//	console.log(advert);
		// Redirect after save
		advert.$save(function(response) {
			$location.path('adverts/' + response._id);

			// Clear form fields
			$scope.id_map = '';
			$scope.title = '';
			$scope.surface = '';
			$scope.room = '';
			$scope.price = '';
			$scope.energetic = '';
			$scope.email = '';
			$scope.address = '';
			$scope.zip_code = '';
			$scope.city = '';
			$scope.price = '';
			$scope.phone = '';
			$scope.description = '';
		}, function(errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};

	// Remove existing Advert
	$scope.remove = function( advert ) {
		if ( advert ) { advert.$remove();
			for (var i in $scope.adverts ) {
				if ($scope.adverts [i] === advert ) {
					$scope.adverts.splice(i, 1);
				}
			}
		} else {
			$scope.advert.$remove(function() {
				$location.path('adverts');
			});
		}
	};

	// Update existing Advert
	$scope.update = function() {
		var advert = $scope.advert ;

		advert.$update(function() {
			$location.path('adverts/' + advert._id);
		}, function(errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};

	// Find a list of Adverts
	$scope.find = function() {
		$scope.adverts = Adverts.query();
	};

	// Find existing Advert
	$scope.findOne = function() {
		$scope.advert = Adverts.get({
			advertId: $stateParams.advertId
		});
	};

	$scope.map = {name: 'map', url: 'modules/adverts/views/map/edit-map.client.view.html'};
}
]);
