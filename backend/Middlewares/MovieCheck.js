const MoviesSchema = require("../Models/Movies");
const favoriteSchema = require("../Models/MoviesFavorites");

exports.checkMoviesFavorite = async (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user._id;

  try {
    const existingFavorite = await MoviesSchema.findOne({
      user_id: userId,
      id: movieId,
    });

    if (existingFavorite) {
      await MoviesSchema.deleteOne({ user_id: userId, id: movieId });
      await favoriteSchema.deleteOne({ user_id: userId, id: movieId });
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
