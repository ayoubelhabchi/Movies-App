const express = require("express");
const router = express.Router();

const seriesController = require('../Controllers/SeriesController')
const {checkSeriesFavorite, checkSeriesList} = require('../Middlewares/SeriesCheck')
const {userAuthentication} = require('../Middlewares/AuthMiddleware')

router.post('/favorites/:seriesId',userAuthentication,checkSeriesFavorite, seriesController.addFavoriteSeries)
router.post('/favorites/check/series/:seriesId',userAuthentication,seriesController.checkSeries)
router.post('/favorites/remove/sereis/:seriesId',userAuthentication,seriesController.deleteSeriesFavorite)
router.get('/favorites/list',userAuthentication, seriesController.getSeriesFavoritesList)

//series watchlist routes
router.post('/add-watchlist/:seriesId',userAuthentication,checkSeriesList, seriesController.addWatchlistSeries)
router.post('/watchlists/check/series/:seriesId',userAuthentication,seriesController.checkSeriesWatchlist)
router.get('/watchlist/list',userAuthentication, seriesController.getSeriesWatchlistList)
router.post('/watchlist/remove/series/:seriesId',userAuthentication,seriesController.deleteSeriesWatchlist)


module.exports = router;