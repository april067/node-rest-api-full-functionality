const { Schema, model } = require('mongoose');

const { handleMongooseError, getConstants } = require('../helpers');

const bookSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		author: {
			type: String,
			required: true,
		},
		favorite: {
			type: Boolean,
			default: false,
		},
		genre: {
			type: String,
			enum: getConstants.genreList, //matches only a list item
			required: true,
		},
		date: {
			type: String,
			match: getConstants.dateRegexp, //matches only a regular expression
			required: true,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'user',
			required: true,
		},
	},
	{ versionKey: false }
);

bookSchema.post('save', handleMongooseError);

const Book = model('Book', bookSchema);

module.exports = Book;
