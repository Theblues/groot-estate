'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var validateLocalStrategyProperty = function(property) {
	return ((this.provider !== 'local' && !this.updated) || property.length);
};

var validateLocalNumber = function(property) {
	if (isNaN(parseFloat(property)) || !isFinite(property))
		return false;
	return property > 0;
};

/**
 * Advert Schema
 */
var AdvertSchema = new Schema({
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
		match:[/[0-9]*/, 'Number required'],
		required: 'Surface is required'
	},
	price: {
		type: Number,
		match:[/[0-9]*.?[0-9]*/, 'Number required'],
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
		match: [/[0-9]{10}/, 'Please fill a phone number'],
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

mongoose.model('Advert', AdvertSchema);
