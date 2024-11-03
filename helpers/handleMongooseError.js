//mongoose doesn't generate status in its errors, so we need to use middleware
//https://mongoosejs.com/docs/middleware.html#error-handling-middleware

const handleMongooseError = (error, _, next) => {
	error.status = 400;
	next();
};

module.exports = handleMongooseError;
