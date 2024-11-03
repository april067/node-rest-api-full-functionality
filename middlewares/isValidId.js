//https://mongoosejs.com/docs/api/mongoose.html#Mongoose.prototype.isValidObjectId()

const { isValidObjectId } = require('mongoose');

const HttpError = require('../helpers/HttpError');

const isValidId = (req, _, next) => {
	const { id } = req.params;

	if (!isValidObjectId(id)) {
		next(HttpError(400, `${id} is not valid id`));
	}

	next();
};

module.exports = isValidId;
