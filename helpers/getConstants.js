const path = require('path');

const genreList = ['fantastic', 'drama', 'honor', 'detective'];
const subscriptionList = ['starter', 'pro', 'business'];

const dateRegexp = /^\d{2}-\d{2}-\d{4}$/;
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const baseURL = 'http://localhost:3000';
const avatarDefaultPath = path.join('avatars', 'avatar__default100500.png');

const getConstants = {
	genreList,
	dateRegexp,
	subscriptionList,
	emailRegexp,
	avatarDefaultPath,
};

module.exports = getConstants;
