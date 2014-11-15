'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Advert Schema
 */
var advertSchema = new Schema({
	id_map: {
		type: String,
		required: 'Select an estate',
		unique: true
	},
	title: {
		type: String,
		trim: true,
		required: 'Title is required'
	},
	surface: {
		type: Number,
		required: 'Surface is required'
	},
	price: {
		type: Number,
		required: 'Price is required'
	},
	room: {
		type: Number,
		required: 'The number of room is required'
	},
	energetic: {
		type: String,
		required: 'Energetic class is required'
	},
	email: {
		type: String,
		trim: true,
		required: 'Email is required'
	},
	address: {
		type: String,
		trim: true,
		required: 'Address is required'
	},
	zip_code: {
		type: String,
		trim: true,
		required: 'Zip Code is required'
	},
	city: {
		type: String,
		trim: true,
		required: 'City is required'
	},
	phone: {
		type: String,
		required: 'Phone number is required'
	},
	description: {
		type: String,
		trim: true,
		default: ''
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Advert', advertSchema);
