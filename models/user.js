const { Schema, model } = require('mongoose');

const { handleMongooseError, getConstants } = require('../helpers');

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Set name for user'],
		},
		email: {
			type: String,
			required: [true, 'Email is required'],
			unique: true,
			match: getConstants.emailRegexp,
		},
		password: {
			type: String,
			required: [true, 'Set password for user'],
		},
		subscription: {
			type: String,
			enum: getConstants.subscriptionList,
			default: getConstants.subscriptionList[0],
		},
		token: String,
	},
	{ versionKey: false }
);

userSchema.post('save', handleMongooseError);

const User = model('user', userSchema);

module.exports = User;
