'use strict';

// Adverts controller
angular.module('adverts').controller('AdvertsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Adverts', 'AdvertsByIdMap',
function($scope, $stateParams, $location, Authentication, Adverts, AdvertsByIdMap) {
	$scope.authentication = Authentication;

	$scope.id_map = '';
	$scope.message = '';
	$scope.messageClass = 'info';
	$scope.files = [];

	// Create new Advert
	$scope.create = function() {

		console.log($scope.files);
		// Create new Advert object
		var advert = new Adverts ({
			id_map: $scope.id_map,
			title: this.advert_title,
			surface: this.advert_surface,
			room: this.advert_room,
			price: this.advert_price,
			energetic: this.advert_energetic,
			email: this.advert_email,
			address: this.advert_address,
			zip_code: this.advert_zip_code,
			city: this.advert_city,
			phone: this.advert_phone,
			description: this.advert_description
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
			$scope.price = '';
			$scope.phone = '';
			$scope.description = '';
			$scope.message = 'Advert added';
			$scope.messageClass = 'success';
			$scope.addBuilding.show  = false;
			$scope.msgBuilding.show	 = true;
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
	};

	$scope.closeAll = function(data) {
		$scope.id_map = '';
		$scope.advert = '';
		$scope.message = '';
		$scope.messageClass = 'info';
		$scope.files = [];
		$scope.listPhoto();
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
			console.log('files longueur : ' + files.length);
			for (var i = 0; i < files.length; i++) {
				$scope.files[i + filePresent] = files[i];
			}

			document.getElementById('form-DAD').style.background='white';
			$scope.listPhoto();
		}

		function handleDragOver(evt) {
			console.log('test 2');
			evt.stopPropagation();
			evt.preventDefault();
			evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
			document.getElementById('form-DAD').style.background='red';
		}

		function handleDragOut(evt) {
			console.log('test 3');
			document.getElementById('form-DAD').style.background='white';
		}

		var dropZone = document.getElementById('form-DAD');
		dropZone.addEventListener('dragover', handleDragOver, false);
		dropZone.addEventListener('mouseout', handleDragOut, false);
		dropZone.addEventListener('drop', handleFileSelect, false);
	};

	$scope.listPhoto = function() {
		var list = '';
		if ($scope.files.length === 0) {
			list = 'No Photo yet';
		}
		else {
			console.log('scope files longueur : ' + $scope.files.length);
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
