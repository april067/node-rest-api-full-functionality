const Joi = require('joi');

const contactAdd = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	phone: Joi.string().required(),
	favorite: Joi.boolean(),
});

const contactUpdate = Joi.object({
	name: Joi.string(),
	email: Joi.string(),
	phone: Joi.string(),
	favorite: Joi.boolean(),
});

const contactFavorite = Joi.object({
	favorite: Joi.boolean().required(),
});

module.exports = {
	contactAdd,
	contactUpdate,
	contactFavorite,
};
