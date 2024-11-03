const genreList = ['fantastic', 'drama', 'honor', 'detective'];
const subscriptionList = ['starter', 'pro', 'business'];
const dateRegexp = /^\d{2}-\d{2}-\d{4}$/;
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const getConstants = {
	genreList,
	dateRegexp,
	subscriptionList,
	emailRegexp,
};

module.exports = getConstants;
