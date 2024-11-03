const { HttpError } = require('../helpers');
const { Contact } = require('../models');

const getAllContacts = async (req, res) => {
	const { _id: owner } = req.user;
	const { page = 1, limit = 10 } = req.query;
	const skip = (page - 1) * limit;
	const contacts = await Contact.find({ owner }, '-createdAt -updatedAt', { skip, limit }).populate(
		'owner',
		'name email subscription'
	);

	res.json(contacts);
};

const getContact = async (req, res) => {
	const { id } = req.params;

	const contact = await Contact.findById(id).populate('owner', 'name email subscription');
	if (!contact) {
		throw HttpError(404, 'Not found');
	}

	res.json(contact);
};

const addContact = async (req, res) => {
	const { _id: owner } = req.user;
	const newContact = await Contact.create({ ...req.body, owner });

	res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
	const { id } = req.params;
	const data = req.body;

	if (Object.keys(data).length === 0)
		res.status(400).json({ message: 'Request body must have at least one field' });

	const updatedContact = await Contact.findByIdAndUpdate(id, data, { new: true });

	if (!updatedContact) {
		throw HttpError(404, 'Not found');
	}

	res.json(updatedContact);
};

const removeContact = async (req, res) => {
	const { id } = req.params;

	const contact = await Contact.findByIdAndDelete(id);
	if (!contact) {
		throw HttpError(404, 'Not found');
	}

	res.json({
		message: 'Deletion successful',
	});
};

const updateFavorite = async (req, res) => {
	const { id } = req.params;

	const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

	if (!result) {
		throw HttpError(404, 'Not found');
	}

	res.json(result);
};

module.exports = {
	getAllContacts,
	getContact,
	addContact,
	updateContact,
	removeContact,
	updateFavorite,
};
