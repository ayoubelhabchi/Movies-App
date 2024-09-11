const express = require("express");
const router = express.Router();
const userController = require('../Controllers/UserController')
const moviesController = require('../Controllers/MovisControllers')

const {userAuthentication} = require('../Middlewares/AuthMiddleware')
const {checkMoviesFavorite, checkMoviesList} = require('../Middlewares/MovieCheck')

//movies favorites routes

router.get('/profile', userAuthentication,userController.userProfile)
router.post('/movies/favorites/:movieId',userAuthentication,checkMoviesFavorite, moviesController.addFavoriteMovies)
router.post('/favorites/check/movie/:movieId',userAuthentication,moviesController.checkMovie)
router.post('/favorites/remove/movie/:movieId',userAuthentication,moviesController.deleteMovieFavorite)
router.get('/movies/favorites/list',userAuthentication, moviesController.getMoviesFavoritesList)

//movies watchlist routes
router.post('/movies/add-watchlist/:movieId',userAuthentication,checkMoviesList, moviesController.addWatchlistMovies)
router.post('/watchlists/check/movie/:movieId',userAuthentication,moviesController.checkMovieWatchlist)
router.get('/movies/watchlist/list',userAuthentication, moviesController.getMoviesWatchlistList)
router.post('/watchlist/remove/movie/:movieId',userAuthentication,moviesController.deleteMovieWatchlist)


module.exports = router;