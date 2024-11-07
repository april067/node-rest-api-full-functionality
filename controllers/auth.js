const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs/promises');
const { SECRET_KEY } = process.env;

const { HttpError } = require('../helpers');
const { ctrlWrapper } = require('../middlewares');
const { User } = require('../models');
const saltRounds = 10;

const register = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (user) {
		throw HttpError(409, 'Email already in use');
	}

	const hashPassword = await bcrypt.hash(password, saltRounds);

	const newUser = await User.create({ ...req.body, password: hashPassword });

	res.status(201).json({
		user: {
			name: newUser.name,
			email: newUser.email,
			subscription: newUser.subscription,
			avatarURL: newUser.avatarURL,
		},
	});
};

const login = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });
	if (!user) {
		throw HttpError(401, 'Email or password is wrong');
	}
	const comparedPassword = await bcrypt.compare(password, user.password);
	if (!comparedPassword) {
		throw HttpError(401, 'Email or password is wrong');
	}

	const payload = { id: user._id };
	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '12h' });
	const userWithToken = await User.findOneAndUpdate({ email }, { token });

	res.status(200).json({
		user: {
			name: userWithToken.name,
			email: userWithToken.email,
			subscription: userWithToken.subscription,
			avatarURL: userWithToken.avatarURL,
		},
		data: {
			token,
		},
	});
};

const current = async (req, res) => {
	const { id, name, email, subscription } = req.user;

	res.json({
		currentUser: {
			id,
			name,
			email,
			subscription,
		},
	});
};

const logout = async (req, res) => {
	const { id } = req.user;
	await User.findByIdAndUpdate(id, { token: '' });

	res.json({
		message: 'Logout successful',
	});
};

const updateAvatar = async (req, res) => {
	const { path: tempPath, filename } = req.file;
	const { _id, token } = req.user;

	const newFilename = `${_id}__${filename}`;
	const resultPath = path.join(__dirname, '../', 'public', 'avatars', newFilename);

	await fs.rename(tempPath, resultPath);

	const avatarPublicPath = path.join('avatars', newFilename);

	const updatedUser = await User.findByIdAndUpdate(_id, { avatarURL: avatarPublicPath });

	console.log('updatedUser :>> ', updatedUser);

	res.status(200).json({
		user: {
			name: updatedUser.name,
			email: updatedUser.email,
			subscription: updatedUser.subscription,
			avatarURL: updatedUser.avatarURL,
		},
		data: {
			token,
		},
	});
};

module.exports = {
	register: ctrlWrapper(register),
	login: ctrlWrapper(login),
	current: ctrlWrapper(current),
	logout: ctrlWrapper(logout),
	updateAvatar: ctrlWrapper(updateAvatar),
};
