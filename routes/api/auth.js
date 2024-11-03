const express = require('express');

const { authControllers } = require('../../controllers');
const { usersSchema } = require('../../schemas');
const { authenticate, validateBody } = require('../../middlewares');

const router = express.Router();

router.post('/register', validateBody(usersSchema.registerJoiSchema), authControllers.register);

router.post('/login', validateBody(usersSchema.loginJoiSchema), authControllers.login);

router.get('/current', authenticate, authControllers.current);

router.post('/logout', authenticate, authControllers.logout);

module.exports = router;
