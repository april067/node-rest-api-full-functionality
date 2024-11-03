const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const { User } = require('../models');
const { HttpError } = require('../helpers');

const authenticate = async (req, _, next) => {
	const { authorization = '' } = req.headers;
	const [bearer, token] = authorization.split(' ');
	if (bearer !== 'Bearer') {
		next(HttpError(401, 'Invalid token'));
	}

	try {
		const { id } = jwt.verify(token, SECRET_KEY);
		const user = await User.findById(id);
		if (!user || !user.token || user.token !== token) {
			next(HttpError(401, 'Not found user or invalid token'));
		}

		//add user as owner to request object for controllers
		req.user = user;
		next();
	} catch {
		next(HttpError(401, 'Invalid token'));
	}
};

module.exports = authenticate;
