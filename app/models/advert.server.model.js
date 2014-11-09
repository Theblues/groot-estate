'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var validateLocalStrategyProperty = function(property) {
	return ((this.provider !== 'local' && !this.updated) || property.length);
};

var validateLocalNumber = function(v) {
	if (isNaN(parseFloat(v)) || !isFinite(v))
		return false;
	return v > 0;
};

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
		min: [0, 'Number upper 0'],
		//validate: [validateLocalNumber, 'Number upper 0'],
		required: 'Surface is required'
	},
	price: {
		type: Number,
		match:[/\d*\.?\d*/, 'Number required'],
		validate: [validateLocalNumber, 'Number upper 0'],
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
		match:[/.+\@.+\..+/, 'Please fill a valid email address'],
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
		match: [/^$|^\d{10}$/, 'Please enter a correct phone number'],
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
