const Joi = require('joi');

const { getConstants } = require('../helpers');

const bookAdd = Joi.object({
	title: Joi.string().required(),
	author: Joi.string().required(),
	favorite: Joi.boolean(),
	genre: Joi.string()
		.valid(...getConstants.genreList)
		.required(),
	date: Joi.string().pattern(getConstants.dateRegexp).required(),
});

const bookUpdate = Joi.object({
	title: Joi.string(),
	author: Joi.string(),
	favorite: Joi.boolean(),
	genre: Joi.string().valid(...getConstants.genreList),
	date: Joi.string().pattern(getConstants.dateRegexp),
});

const bookFavoriteBook = Joi.object({
	favorite: Joi.boolean().required(),
});

module.exports = {
	bookAdd,
	bookUpdate,
	bookFavoriteBook,
};
