'use strict';

(function () {
    // Adverts Controller Spec
    describe('Adverts Controller Tests', function () {
        // Initialize global variables
        var AdvertsController,
            scope,
            $httpBackend,
            $stateParams,
            $location;

        // The $resource service augments the response object with methods for updating and deleting the resource.
        // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
        // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
        // When the toEqualData matcher compares two objects, it takes only object properties into
        // account and ignores methods.
        beforeEach(function () {
            jasmine.addMatchers({
                toEqualData: function (util, customEqualityTesters) {
                    return {
                        compare: function (actual, expected) {
                            return {
                                pass: angular.equals(actual, expected)
                            };
                        }
                    };
                }
            });
        });

        // Then we can start by loading the main application module
        beforeEach(module(ApplicationConfiguration.applicationModuleName));

        // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
        // This allows us to inject a service but then attach it to a variable
        // with the same name as the service.
        beforeEach(inject(function ($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
            // Set a new global scope
            scope = $rootScope.$new();

            // Point global variables to injected services
            $stateParams = _$stateParams_;
            $httpBackend = _$httpBackend_;
            $location = _$location_;

            // Initialize the Adverts controller.
            AdvertsController = $controller('AdvertsController', {
                $scope: scope
            });
        }));

        it('$scope.find() should create an array with at least one Advert object fetched from XHR', inject(function (Adverts) {
            // Create sample Advert using the Adverts service
            var sampleAdvert = new Adverts({
                title: 'Advert Name',
                id_map: '-630059',
                surface: 50,
                price: 500,
                room: 5,
                energetic: 'C',
                email: 'toto@gmail.com',
                address: 'Address',
                zip_code: '00000',
                city: 'City',
                phone: '000000000'
            });

            // Create a sample Adverts array that includes the new Advert
            var sampleAdverts = [sampleAdvert];

            // Set GET response
            $httpBackend.expectGET('adverts').respond(sampleAdverts);

            // Run controller functionality
            scope.find();
            $httpBackend.flush();

            // Test scope value
            expect(scope.adverts).toEqualData(sampleAdverts);
        }));

        it('$scope.findOne() should create an array with one Advert object fetched from XHR using a advertId URL parameter', inject(function (Adverts) {
            // Define a sample Advert object
            var sampleAdvert = new Adverts({
                title: 'Advert Name',
                id_map: '-630059',
                surface: 50,
                price: 500,
                room: 5,
                energetic: 'C',
                email: 'toto@gmail.com',
                address: 'Address',
                zip_code: '00000',
                city: 'City',
                phone: '000000000'
            });

            // Set the URL parameter
            $stateParams.advertId = '525a8422f6d0f87f0e407a33';

            // Set GET response
            $httpBackend.expectGET(/adverts\/([0-9a-fA-F]{24})$/).respond(sampleAdvert);

            // Run controller functionality
            scope.findOne();
            $httpBackend.flush();

            // Test scope value
            expect(scope.advert).toEqualData(sampleAdvert);
        }));

        it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function (Adverts) {
            // Create a sample Advert response
            var sampleAdvertResponse = new Adverts({
                _id: '525cf20451979dea2c000001',
                id_map: '-630059',
                title: 'Advert Name',
                surface: 50,
                price: 500,
                room: 5,
                energetic: 'C',
                email: 'toto@gmail.com',
                address: 'Address',
                zip_code: '00000',
                city: 'City',
                phone: '000000000',
                description: '',
                photos: []
            });

            scope.id_map = '-630059';
            scope.advert_title = 'Advert Name';
            scope.advert_surface = 50;
            scope.advert_price = 500;
            scope.advert_room = 5;
            scope.advert_energetic = 'C';
            scope.advert_email = 'toto@gmail.com';
            scope.advert_address = 'Address';
            scope.advert_zip_code = '00000';
            scope.advert_city = 'City';
            scope.advert_phone = '000000000';
            scope.advert_description = '';
            scope.files = [];

            $httpBackend.expectPOST('adverts', {
                title: 'Advert Name',
                id_map: '-630059',
                surface: 50,
                price: 500,
                room: 5,
                energetic: 'C',
                email: 'toto@gmail.com',
                address: 'Address',
                zip_code: '00000',
                city: 'City',
                phone: '000000000',
                description: '',
                photos: []
            }).respond(sampleAdvertResponse);

            scope.create();
            $httpBackend.flush();

            // Test form inputs are reset
            expect(scope.id_map).toEqual('');
            expect(scope.title).toEqual('');
            expect(scope.surface).toEqual('');
            expect(scope.price).toEqual('');
            expect(scope.room).toEqual('');
            expect(scope.energetic).toEqual('');
            expect(scope.email).toEqual('');
            expect(scope.address).toEqual('');
            expect(scope.zip_code).toEqual('');
            expect(scope.city).toEqual('');
            expect(scope.phone).toEqual('');
            expect(scope.description).toEqual('');

            // Test URL redirection after the Advert was created
            expect($location.path()).toBe('');
        }));

        it('$scope.update() should update a valid Advert', inject(function (Adverts) {
            // Define a sample Advert put data
            var sampleAdvertPutData = new Adverts({
                _id: '525cf20451979dea2c000001',
                title: 'New Advert'
            });

            // Mock Advert in scope
            scope.advert = sampleAdvertPutData;

            // Set PUT response
            $httpBackend.expectPUT(/adverts\/([0-9a-fA-F]{24})$/).respond();

            // Run controller functionality
            scope.update();
            $httpBackend.flush();

            // Test URL location to new object
            expect($location.path()).toBe('');
        }));

        it('$scope.remove() should send a DELETE request with a valid advertId and remove the Advert from the scope', inject(function (Adverts) {
            // Create new Advert object
            var sampleAdvert = new Adverts({
                _id: '525a8422f6d0f87f0e407a33'
            });

            // Create new Adverts array and include the Advert
            scope.adverts = [sampleAdvert];

            // Set expected DELETE response
            $httpBackend.expectDELETE(/adverts\/([0-9a-fA-F]{24})$/).respond(204);

            // Run controller functionality
            scope.remove(sampleAdvert);
            $httpBackend.flush();

            // Test array after successful delete
            expect(scope.adverts.length).toBe(0);
        }));
    });
}());
