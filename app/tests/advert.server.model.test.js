'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Advert = mongoose.model('Advert');

/**
 * Globals
 */
var user, advert, advert2;

/**
 * Unit tests
 */
describe('Advert Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() {
			advert = new Advert({
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
				user: user
			});

			advert2 = new Advert({
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
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return advert.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without id_map', function(done) {
			advert.id_map = '';

			return advert.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without title', function(done) {
			advert.title = '';

			return advert.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without surface', function(done) {
			advert.surface = '';

			return advert.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without price', function(done) {
			advert.price = '';

			return advert.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without room', function(done) {
			advert.room = '';

			return advert.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without energetic', function(done) {
			advert.energetic = '';

			return advert.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without email', function(done) {
			advert.email = '';

			return advert.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without address', function(done) {
			advert.address = '';

			return advert.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without Zip Code', function(done) {
			advert.zip_code = '';

			return advert.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without city', function(done) {
			advert.city = '';

			return advert.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without phone', function(done) {
			advert.phone = '';

			return advert.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should fail to save an advert with the same id_map', function(done) {
			advert.save();
			return advert2.save(function(err) {
				should.exist(err);
				done();
			});
		});

	});

	afterEach(function(done) { 
		Advert.remove().exec();
		User.remove().exec();

		done();
	});
});
