const express = require("express");
const router = express.Router();
const moviesController = require('../Controllers/MovisControllers')
const {checkMoviesFavorite, checkMoviesList} = require('../Middlewares/MovieCheck')
const {userAuthentication} = require('../Middlewares/AuthMiddleware')


//movies favorites routes

router.post('/favorites/:movieId',userAuthentication,checkMoviesFavorite, moviesController.addFavoriteMovies)
router.post('/favorites/check/movie/:movieId',userAuthentication,moviesController.checkMovie)
router.post('/favorites/remove/movie/:movieId',userAuthentication,moviesController.deleteMovieFavorite)
router.get('/favorites/list',userAuthentication, moviesController.getMoviesFavoritesList)

//movies watchlist routes
router.post('/add-watchlist/:movieId',userAuthentication,checkMoviesList, moviesController.addWatchlistMovies)
router.post('/watchlists/check/movie/:movieId',userAuthentication,moviesController.checkMovieWatchlist)
router.get('/watchlist/list',userAuthentication, moviesController.getMoviesWatchlistList)
router.post('/watchlist/remove/movie/:movieId',userAuthentication,moviesController.deleteMovieWatchlist)


module.exports = router;