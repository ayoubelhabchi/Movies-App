const SeriesSchema = require("../Models/Tv/Series");
const favoriteShema = require("../Models/Tv/FavoriteShema");
const watchlistSchema = require("../Models/Tv/TvWatchlist");
const watchlistCheckSchema = require("../Models/Tv/TvWatchlistCheck");

//Favoriting Series

exports.addFavoriteSeries = async (req, res) => {
  const {
    user_id,
    id,
    name,
    first_air_date,
    poster_path,
    popularity,
    vote_average,
    vote_count,
  } = req.body;

  const userId = req.user._id;

  if (!userId) return res.status(400).json({ message: "User ID is required." });
  if (!id) return res.status(400).json({ message: "Movie ID is required." });
  if (!name) return res.status(400).json({ message: "Name is required." });

  if (!first_air_date)
    return res.status(400).json({ message: "Release date is required." });
  if (!poster_path)
    return res.status(400).json({ message: "Poster path is required." });

  if (popularity === undefined)
    return res.status(400).json({ message: "Popularity is required." });
  if (vote_average === undefined)
    return res.status(400).json({ message: "Vote average is required." });
  if (vote_count === undefined)
    return res.status(400).json({ message: "Vote count is required." });

  try {
    const newFavorite = new SeriesSchema({
      user_id: userId,
      id: id,
      name: name,
      first_air_date: first_air_date,
      poster_path: poster_path,
      popularity: popularity,
      vote_average: vote_average,
      vote_count: vote_count,
    });
    const favoritesCheck = new favoriteShema({ user_id: userId, id: id });
    await newFavorite.save();
    await favoritesCheck.save();

    res.status(200).json({ message: "Added to favorites" });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.checkSeries = async (req, res) => {
  const { seriesId } = req.params;
  const userId = req.user._id;

  // console.log(movieId,userId);

  try {
    const existingFavorite = await favoriteShema.findOne({
      user_id: userId,
      id: seriesId,
    });

    if (existingFavorite) {
      return res.status(200).json({ isFavorited: true });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteSeriesFavorite = async (req, res) => {
  const { seriesId } = req.params;
  const userId = req.user._id;

  try {
    const existingFavorite = await SeriesSchema.findOne({
      user_id: userId,
      id: seriesId,
    });

    if (existingFavorite) {
      await SeriesSchema.deleteOne({ user_id: userId, id: seriesId });
      await favoriteShema.deleteOne({ user_id: userId, id: seriesId });
      return res.status(200).json({ message: "Removed from favorites" });
    } else {
      return res
        .status(404)
        .json({ message: "Could not find movie with that ID" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getSeriesFavoritesList = async (req, res) => {
  const userId = req.user._id;
  try {
    if (!userId)
      return res.status(400).json({ message: "User ID is required." });

    const favoriteSeriesList = await SeriesSchema.find({ user_id: userId });

    if (favoriteSeriesList.length === 0) {
      return res
        .status(404)
        .json({ message: "No favorite movies found for this user." });
    }

    const favoritedSeries = favoriteSeriesList.map((series) => ({
      user_id: series.user_id,
      id: series.id,
      name: series.name,
      poster_path: series.poster_path,
      popularity: series.popularity,
      vote_average: series.vote_average,
      vote_count: series.vote_count,
    }));

    return res.status(200).json({ data: favoritedSeries });
  } catch (error) {
    res.status(500).json({ error: "Error while getting the list" });
  }
};

// Watchlist Series

exports.addWatchlistSeries = async (req, res) => {
  const {
    user_id,
    id,
    name,
    first_air_date,
    poster_path,
    popularity,
    vote_average,
    vote_count,
  } = req.body;

  const userId = req.user._id;

  if (!userId) return res.status(400).json({ message: "User ID is required." });
  if (!id) return res.status(400).json({ message: "Series ID is required." });
  if (!name) return res.status(400).json({ message: "Title is required." });

  if (!first_air_date)
    return res.status(400).json({ message: "Release date is required." });
  if (!poster_path)
    return res.status(400).json({ message: "Poster path is required." });

  if (popularity === undefined)
    return res.status(400).json({ message: "Popularity is required." });
  if (vote_average === undefined)
    return res.status(400).json({ message: "Vote average is required." });
  if (vote_count === undefined)
    return res.status(400).json({ message: "Vote count is required." });

  try {
    const newWatchlist = new watchlistSchema({
      user_id: userId,
      id: id,
      name: name,
      first_air_date: first_air_date,
      poster_path: poster_path,
      popularity: popularity,
      vote_average: vote_average,
      vote_count: vote_count,
    });

    const watchlistCheck = new watchlistCheckSchema({
      user_id: userId,
      id: id,
    });
    await newWatchlist.save();
    await watchlistCheck.save();

    res.status(200).json({ message: "Added to watchlist" });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.checkSeriesWatchlist = async (req, res) => {
  const { seriesId } = req.params;
  const userId = req.user._id;

  // console.log(movieId,userId);

  try {
    const existingWatchlist = await watchlistCheckSchema.findOne({
      user_id: userId,
      id: seriesId,
    });

    if (existingWatchlist) {
      return res.status(200).json({ isAddWatchlist: true });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getSeriesWatchlistList = async (req, res) => {
  const userId = req.user._id;
  try {
    if (!userId)
      return res.status(400).json({ message: "User ID is required." });

    const watchlistMoviesList = await watchlistSchema.find({ user_id: userId });

    if (watchlistMoviesList.length === 0) {
      return res
        .status(404)
        .json({ message: "No watchlist series found for this user." });
    }

    return res.status(200).json({ data: watchlistMoviesList });
  } catch (error) {
    res.status(500).json({ error: "Error while getting the list" });
  }
};

exports.deleteSeriesWatchlist = async (req, res) => {
  const { seriesId } = req.params;
  const userId = req.user._id;

  try {
    const existingFavorite = await watchlistSchema.findOne({
      user_id: userId,
      id: seriesId,
    });

    if (existingFavorite) {
      await watchlistSchema.deleteOne({ user_id: userId, id: seriesId });
      await watchlistCheckSchema.deleteOne({ user_id: userId, id: seriesId });
      return res.status(200).json({ message: "Removed from watchlist" });
    } else {
      return res
        .status(404)
        .json({ message: "Could not find series with that ID" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
