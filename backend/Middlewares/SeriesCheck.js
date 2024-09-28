const SeriesSchema = require("../Models/Tv/Series");
const favoriteSchema = require("../Models/Tv/FavoriteShema");
const SeriesWatchlist = require("../Models/Tv/TvWatchlist")
const TvWatchlistCheck = require("../Models/Tv/TvWatchlistCheck")

exports.checkSeriesFavorite = async (req, res, next) => {
  const { seriesId } = req.params;
  const userId = req.user._id;

  try {
    const existingFavorite = await SeriesSchema.findOne({
      user_id: userId,
      id: seriesId,
    });

    if (existingFavorite) {
      await SeriesSchema.deleteOne({ user_id: userId, id: seriesId });
      await favoriteSchema.deleteOne({ user_id: userId, id: seriesId });
      return res
        .status(200)
        .json({ isFavorited: true, message: "Removed from favorites" });
    } else {
      next();
      // return res.status(200).json({ isFavorited: false })
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.checkSeriesList = async (req, res, next) => {
  const { seriesId } = req.params;
  const userId = req.user._id;

  try {
    const existingWatchlist = await SeriesWatchlist.findOne({
      user_id: userId,
      id: seriesId,
    });

    if (existingWatchlist) {
      await SeriesWatchlist.deleteOne({ user_id: userId, id: seriesId });
      await TvWatchlistCheck.deleteOne({ user_id: userId, id: seriesId });
      return res
        .status(200)
        .json({ isAddWatchlist: true, message: "Series was removed from watchlist" });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
