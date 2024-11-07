const express = require('express');
const cors = require('cors');
const request = require('supertest');

const { validateBody } = require('../middlewares');
const { usersSchema } = require('../schemas');
const { login } = require('./auth');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/auth/login', validateBody(usersSchema.loginJoiSchema), login);

describe('test login controller', () => {
	const server = app.listen(3000);
	beforeAll(() => server);
	afterAll(() => server.close());

	test('login controller', async () => {
		const response = await request(app).post('/api/auth/login');
		expect(response.status).toBe(200);
	});
});
