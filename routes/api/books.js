const express = require('express');

const { booksControllers } = require('../../controllers');
const { booksSchema } = require('../../schemas');
const { authenticate, validateBody, isValidId, ctrlWrapper } = require('../../middlewares');

const router = express.Router();

router.get('/', authenticate, ctrlWrapper(booksControllers.getAllBooks));

router.get('/:id', authenticate, isValidId, ctrlWrapper(booksControllers.getBook));
router.post(
	'/',
	authenticate,
	validateBody(booksSchema.bookAdd),
	ctrlWrapper(booksControllers.addBook)
);

router.put(
	'/:id',
	authenticate,
	isValidId,
	validateBody(booksSchema.bookUpdate),
	ctrlWrapper(booksControllers.updateBook)
);

router.delete('/:id', authenticate, isValidId, ctrlWrapper(booksControllers.removeBook));

router.patch(
	'/:id/favorite',
	isValidId,
	authenticate,
	validateBody(booksSchema.bookFavoriteBook),
	ctrlWrapper(booksControllers.updateFavorite)
);

module.exports = router;
