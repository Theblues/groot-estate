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
	/*id_map: {
		type: Number
		//unique: true
	},*/
	title: {
		type: String,
		trim: true,
		default: '',
		required: 'Title is required'
	},
	surface: {
		type: Number,
		validate: [validateLocalNumber, 'Number upper 0'],
		required: 'Surface is required'
	},
	price: {
		type: Number,
		match:[/^[0-9]*.?[0-9]\*$/, 'Number required'],
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
		default: '',
		match:[/.+\@.+\..+/, 'Please fill a valid email address'],
		required: 'Email is required'
	},
	address: {
		type: String,
		trim: true,
		default: '',
		required: 'Address is required'
	},
	zip_code: {
		type: String,
		trim: true,
		default: '',
		required: 'Zip Code is required'
	},
	city: {
		type: String,
		trim: true,
		default: '',
		required: 'City is required'
	},
	phone: {
		type: String,
		match: [/^$|^\d{10}$/, 'Please enter a correct phone number'],
		default: '',
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
