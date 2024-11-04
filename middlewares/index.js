const authenticate = require('./authenticate');
const ctrlWrapper = require('./ctrlWrapper');
const validateBody = require('./validateBody');
const isValidId = require('./isValidId');
const uploadFile = require('./uploadFile');

module.exports = {
	authenticate,
	ctrlWrapper,
	validateBody,
	isValidId,
	uploadFile,
};
