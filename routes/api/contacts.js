const express = require('express');

const { contactsControllers } = require('../../controllers');
const { contactsSchema } = require('../../schemas');
const { authenticate, validateBody, ctrlWrapper, isValidId } = require('../../middlewares');

const router = express.Router();

router.get('/', authenticate, ctrlWrapper(contactsControllers.getAllContacts));

router.get('/:id', authenticate, isValidId, ctrlWrapper(contactsControllers.getContact));

router.post(
	'/',
	authenticate,
	validateBody(contactsSchema.contactAdd),
	ctrlWrapper(contactsControllers.addContact)
);

router.put(
	'/:id',
	authenticate,
	isValidId,
	validateBody(contactsSchema.contactUpdate),
	ctrlWrapper(contactsControllers.updateContact)
);
router.delete('/:id', authenticate, isValidId, ctrlWrapper(contactsControllers.removeContact));

router.patch(
	'/:id/favorite',
	authenticate,
	isValidId,
	validateBody(contactsSchema.contactFavorite),
	ctrlWrapper(contactsControllers.updateFavorite)
);

module.exports = router;
