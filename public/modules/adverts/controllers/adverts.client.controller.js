'use strict';

// Adverts controller
angular.module('adverts').controller('AdvertsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Adverts', 'AdvertsByIdMap',
function($scope, $stateParams, $location, Authentication, Adverts, AdvertsByIdMap) {
	$scope.authentication = Authentication;

	$scope.init = function() {
		$scope.id_map = '';
		$scope.message = '';
		$scope.messageClass = 'info';
		$scope.files = [];
		$scope.classes = '';
	};
	// Create new Advert
	$scope.create = function() {

		$scope.filesName = [];
		for (var i = 0; i < $scope.files.length; i++) {
			$scope.filesName[i] = $scope.files[i].name;
		}
		console.log($scope.filesName);
		// upload

		console.log($scope.advert_title);
		// Create new Advert object
		var advert = new Adverts ({
			id_map: $scope.id_map,
			title: $scope.advert_title || this.advert_title,
			surface: $scope.advert_surface || this.advert_surface,
			room: $scope.advert_room || this.advert_room,
			price: $scope.advert_price || this.advert_price,
			energetic: $scope.advert_energetic || this.advert_energetic,
			email: $scope.advert_email || this.advert_email,
			address: $scope.advert_address || this.advert_address,
			zip_code: $scope.advert_zip_code || this.advert_zip_code,
			city: $scope.advert_city || this.advert_city,
			phone: $scope.advert_phone || this.advert_phone,
			description: $scope.advert_description || this.advert_description,
			photos: $scope.filesName
		});

		// Redirect after save
		advert.$save(function(response) {
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
			$scope.phone = '';
			$scope.description = '';
			$scope.message = 'Advert added';
			$scope.messageClass = 'success';
			$scope.addBuilding.show  = false;
			$scope.msgBuilding.show	 = true;
			$scope.files = [];
		}, function(errorResponse) {
			$scope.error = errorResponse.data.message;
			$scope.message = $scope.error;
			$scope.messageClass = 'error';
			$scope.msgBuilding.show	 = true;
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

		$scope.viewBuilding.show = false;
		$scope.msgBuilding.show	 = true;
		$scope.message = 'Advert deleted';
		$scope.messageClass = 'success';
	};

	// Update existing Advert
	$scope.update = function() {
		var advert = $scope.advert;

		advert.$update(function() {
			$scope.editBuilding.show = false;
			$scope.message = 'Advert edited';
			$scope.messageClass = 'success';
			$scope.msgBuilding.show	 = true;
		}, function(errorResponse) {
			$scope.error = errorResponse.data.message;
			$scope.message = $scope.error;
			$scope.messageClass = 'error';
			$scope.msgBuilding.show	 = true;
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

	// Find existing Advert
	$scope.findOneByIdMap = function(data) {
		$scope.data = data;
		$scope.advert = AdvertsByIdMap.get({
			advertIdMap: data.id_map
		});
		$scope.advert.description = $scope.advert.description.replace(/(?:\r\n|\r|\n)/g, '<br />');
	};

	$scope.closeAll = function(data) {
		$scope.id_map = '';
		$scope.advert = '';
		$scope.message = '';
		$scope.messageClass = 'info';
		$scope.files = [];
		$scope.listAddPhoto();
		$scope.viewBuilding.show = false;
		$scope.addBuilding.show  = false;
		$scope.editBuilding.show = false;
		$scope.msgBuilding.show	 = false;
		if (typeof data !== 'undefined' && typeof data.advert_add_form !== 'undefined') {
			data.advert_add_form.$setPristine();
		}
		if (typeof data !== 'undefined' && typeof data.advert_edit_form !== 'undefined') {
			data.advert_edit_form.$setPristine();
		}
	};

	$scope.dragAndDrop = function() {
		function handleFileSelect(evt) {
			evt.stopPropagation();
			evt.preventDefault();

			var files = evt.dataTransfer.files; // FileList object.
			var filePresent = $scope.files.length;
			for (var i = 0; i < files.length; i++) {
				$scope.files[i + filePresent] = files[i];
			}

			document.getElementById('form-DAD').style.background='white';
			$scope.listAddPhoto();
		}

		function handleDragOver(evt) {
			evt.stopPropagation();
			evt.preventDefault();
			evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
			document.getElementById('form-DAD').style.background='red';
		}

		var dropZone = document.getElementById('form-DAD');
		dropZone.addEventListener('dragover', handleDragOver, false);
		dropZone.addEventListener('drop', handleFileSelect, false);
	};

	$scope.listAddPhoto = function() {
		var list = '';
		if ($scope.files.length === 0) {
			list = 'No Photo yet';
		}
		else {
			list = '<ul class="class="list-group">';
			for (var i = 0; i < $scope.files.length; i++) {
				list += '<li class="list-group-item">' + $scope.files[i].name + '<span class="glyphicon glyphicon-remove-sign navbar-right"></span></li>';
			}
			list += '</ul>';
		}
		document.getElementById('list-photo').innerHTML = list;
	};

	$scope.addBuilding 	= {url:'modules/adverts/views/create-advert.client.view.html', 	show:false};
	$scope.viewBuilding = {url:'modules/adverts/views/view-advert.client.view.html', 	show:false};
	$scope.editBuilding = {url:'modules/adverts/views/edit-advert.client.view.html', 	show:false};
	$scope.msgBuilding 	= {url:'modules/adverts/views/msg-advert.client.view.html', 	show:false};
}]);
