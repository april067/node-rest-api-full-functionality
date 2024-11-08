/*
!!!!!!!!!!!!!!!!!!

1.) for a test run put this imitation data-request in the login controller instead of:
const { email, password } = req.body;

  const email = ''; //take it from registration-data
	const password = ''; //take it from registration-data

	

2.) do not use Joi.scheme as a middleware because of the missing real req.body

3.) const SECRET_KEY = ''; //take it from process.env because JEST doesn't see .env

*/

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const supertest = require('supertest');

const { login } = require('./auth');
const DB_HOST = ''; // !!!!!!! take it from process.env because JEST doesn't see .env
const PORT = 3000; // !!!!!!! take it from process.env because JEST doesn't see .env

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/auth/login', login);

app.use((_, res) => {
	res.status(404).json({
		message: 'Route not found',
	});
});

app.use((err, req, res, next) => {
	const { status = 500, message = 'Server error' } = err;

	res.status(status).json({ message });
});

describe('test login controller', () => {
	const server = mongoose
		.connect(DB_HOST)
		.then(() =>
			app.listen(PORT, () => {
				console.log(`Database connected successful on ${PORT}`);
			})
		)
		.catch((err) => {
			console.log(err.message);
			process.exit(1);
		});

	beforeAll(() => server);

	test('the login controller MUST return status=200', async () => {
		const response = await supertest(app).post('/api/auth/login');

		// console.log('STATUS :>> ', response.status);
		// console.log('RESPONSE.ERROR :>>>>>>>>>>> ', response.error);

		expect(response.status).toBe(200);
	});
});
