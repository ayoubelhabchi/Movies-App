const express = require('express')
const router = express.Router();
const Auth = require('../Controllers/AuthController')


router.post('/signup', Auth.SignUp)
router.post('/signin', Auth.SignIn)


module.exports = router;