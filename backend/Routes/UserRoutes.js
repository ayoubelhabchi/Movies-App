const express = require("express");
const router = express.Router();
const userController = require('../Controllers/UserController')

const {userAuthentication} = require('../Middlewares/AuthMiddleware')


router.get('/profile', userAuthentication,userController.userProfile)


module.exports = router;