const Joi = require('joi');

const { getConstants } = require('../helpers');

const registerJoiSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().pattern(getConstants.emailRegexp).required(),
	password: Joi.string().min(8).max(16).required(),
	subscription: Joi.string().valid(...getConstants.subscriptionList),
});

const loginJoiSchema = Joi.object({
	email: Joi.string().pattern(getConstants.emailRegexp).required(),
	password: Joi.string().min(8).max(16).required(),
});

module.exports = {
	registerJoiSchema,
	loginJoiSchema,
};
