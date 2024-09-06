const express = require("express");
const router = express.Router();
const userController = require('../Controllers/UserController')

const {userAuthentication} = require('../Middlewares/AuthMiddleware')
const {checkMoviesFavorite} = require('../Middlewares/MovieCheck')


router.get('/profile', userAuthentication,userController.userProfile)
router.post('/movies/favorites/:movieId',userAuthentication,checkMoviesFavorite,userController.addFavoriteMovies)
router.post('/favorites/check/movie/:movieId',userAuthentication,userController.checkMovie)
router.post('/favorites/remove/movie/:movieId',userAuthentication,userController.deleteMovieFavorite)
router.get('/movies/favorites/list',userAuthentication, userController.getMoviesFavoritesList)

module.exports = router;