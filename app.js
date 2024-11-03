const express = require('express');
const cors = require('cors');
const moment = require('moment');
const morgan = require('morgan');
const fs = require('fs/promises');
require('dotenv').config();

const booksRouter = require('./routes/api/books');
const contactsRouter = require('./routes/api/contacts');
const authRouter = require('./routes/api/auth');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json()); // parse application/json

app.use(async (req, _, next) => {
	const { method, url } = req;
	const date = moment().format('DD-MM-YYYY_HH:mm:ss');
	await fs.appendFile('./public/server.log', `\n${method} ${url} ${date}`);
	next();
});

app.use('/api/books', booksRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/auth', authRouter);

app.use((_, res) => {
	res.status(404).json({
		message: 'Route not found',
	});
});

app.use((err, req, res, next) => {
	const { status = 500, message = 'Server error' } = err;

	res.status(status).json({ message });
});

module.exports = app;
