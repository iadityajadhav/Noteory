const express = require('express');
const router = express.Router();
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidations');
const { signup, login } = require('../Controllers/AuthController');

router.post('/signup', signupValidation, signup)

router.post('/login', loginValidation, login)

module.exports = router;