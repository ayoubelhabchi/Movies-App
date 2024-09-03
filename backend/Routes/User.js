const express = require('express')
const router = express.Router();
const Auth = require('../Controllers/Auth')


router.post('/signup', Auth.SignUp)


module.exports = router;