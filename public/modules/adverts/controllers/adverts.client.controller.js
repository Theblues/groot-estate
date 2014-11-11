'use strict';

// Adverts controller
angular.module('adverts').controller('AdvertsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Adverts',
function($scope, $stateParams, $location, Authentication, Adverts) {
	$scope.authentication = Authentication;

	$scope.addIdMap = function(id_map) {
		$scope.id_map = id_map;
	};

	$scope.resetForm = function(data) {
		data.advert_add_form.$setPristine();
	};

	// Create new Advert
	$scope.create = function() {
		// Create new Advert object
		var advert = new Adverts ({
			id_map: $scope.id_map,
			title: this.advert_title,
			surface: this.advert_surface,
			room: this.advert_room,
			price: this.advert_price,
			energetic: this.advert_energetic,
			email: this.advert_mail,
			address: this.advert_address,
			zip_code: this.advert_zip_code,
			city: this.advert_city,
			phone: this.advert_phone,
			description: this.advert_des
		});

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
	$scope.remove = function(advert) {
		if (advert) {
			advert.$remove();
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

	$scope.viewAdvert = function(data) {
		$scope.advert = data;
	};

	$scope.addBuilding 	= function() { return 'modules/adverts/views/create-advert.client.view.html';	};
	$scope.viewBuilding = function() { return 'modules/adverts/views/view-advert.client.view.html';		};
}
]);
