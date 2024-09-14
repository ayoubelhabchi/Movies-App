const SeriesSchema = require("../Models/Tv/Series");
const favoriteSchema = require("../Models/Tv/FavoriteShema");
// const MoviesWatchlist = require('../Models/Movies/MoviesWatchlist')
// const watchlistCheckSchema = require('../Models/Movies/MoviesWatchlistCheck')

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

// exports.checkSeriesList = async (req, res, next) => {
//   const { movieId } = req.params;
//   const userId = req.user._id;

//   try {
//     const existingFavorite = await MoviesWatchlist.findOne({
//       user_id: userId,
//       id: movieId,
//     });

//     if (existingFavorite) {
//       await MoviesWatchlist.deleteOne({ user_id: userId, id: movieId });
//       await watchlistCheckSchema.deleteOne({ user_id: userId, id: movieId });
//       return res
//         .status(200)
//         .json({ isFavorited: true, message: "Removed from favorites" });
//     } else {
//       next();
//       // return res.status(200).json({ isFavorited: false })
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
