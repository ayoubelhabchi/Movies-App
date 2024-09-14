const express = require("express");
const router = express.Router();

const seriesController = require('../Controllers/SeriesController')
const {checkSeriesFavorite} = require('../Middlewares/SeriesCheck')
const {userAuthentication} = require('../Middlewares/AuthMiddleware')

router.post('/favorites/:seriesId',userAuthentication,checkSeriesFavorite, seriesController.addFavoriteSeries)
router.post('/favorites/check/series/:seriesId',userAuthentication,seriesController.checkSeries)
router.post('/favorites/remove/sereis/:seriesId',userAuthentication,seriesController.deleteSeriesFavorite)
router.get('/favorites/list',userAuthentication, seriesController.getSeriesFavoritesList)



module.exports = router;