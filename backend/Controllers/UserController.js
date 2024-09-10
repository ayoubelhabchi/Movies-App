const User = require("../Models/User");
const MoviesSchema = require("../Models/Movies");
const favoriteSchema = require("../Models/MoviesFavorites");

exports.userProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userProfile = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      country: user.country,
      city: user.city,
    };
    return res.status(200).json({ data: userProfile });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.addFavoriteMovies = async (req, res) => {
  const {
    user_id,
    id,
    title,
    original_title,
    overview,
    release_date,
    poster_path,
    genre_ids,
    original_language,
    popularity,
    vote_average,
    vote_count,
    adult
  } = req.body;

  const userId = req.user._id;

  if (!userId) return res.status(400).json({ message: "User ID is required." });
  if (!id) return res.status(400).json({ message: "Movie ID is required." });
  if (!title) return res.status(400).json({ message: "Title is required." });
  if (!original_title)
    return res.status(400).json({ message: "Original title is required." });
  if (!overview)
    return res.status(400).json({ message: "Overview is required." });
  if (!release_date)
    return res.status(400).json({ message: "Release date is required." });
  if (!poster_path)
    return res.status(400).json({ message: "Poster path is required." });
  if (!genre_ids || !Array.isArray(genre_ids))
    return res
      .status(400)
      .json({ message: "Genre IDs are required and must be an array." });
  if (!original_language)
    return res.status(400).json({ message: "Original language is required." });
  if (popularity === undefined)
    return res.status(400).json({ message: "Popularity is required." });
  if (vote_average === undefined)
    return res.status(400).json({ message: "Vote average is required." });
  if (vote_count === undefined)
    return res.status(400).json({ message: "Vote count is required." });
  if (adult === undefined)
    return res.status(400).json({ message: "Adult flag is required." });

  try {
    const newFavorite = new MoviesSchema({
      user_id: userId,
      id: id,
      title: title,
      original_title: original_title,
      overview: overview,
      release_date: release_date,
      poster_path: poster_path,
      genre_ids: genre_ids,
      original_language: original_language,
      popularity: popularity,
      vote_average: vote_average,
      vote_count: vote_count,
      adult: adult,
    });
    const favoritesCheck = new favoriteSchema({ user_id: userId, id: id });
    await newFavorite.save();
    await favoritesCheck.save();

    res.status(200).json({ message: "Added to favorites" });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.checkMovie = async (req, res) => {
  const { movieId } = req.params;
  const userId = req.user._id;

  // console.log(movieId,userId);

  try {
    const existingFavorite = await favoriteSchema.findOne({
      user_id: userId,
      id: movieId,
    });

    if (existingFavorite) {
      return res
        .status(200)
        .json({ isFavorited: true });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteMovieFavorite = async (req, res) => {
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
        .json({ message: "Removed from favorites" });

    } else {
      return res.status(404).json({message: "Could not find movie with that ID"})
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getMoviesFavoritesList = async (req,res) => {
  const userId = req.user._id;
  try {
    if (!userId) return res.status(400).json({ message: "User ID is required." });

    const favoriteMoviesList = await MoviesSchema.find({user_id: userId})

    if (favoriteMoviesList.length === 0) {
      return res.status(404).json({ message: "No favorite movies found for this user." });
    }

    const favoritedMovies = favoriteMoviesList.map(movie => ({
      user_id: movie.user_id,
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      popularity: movie.popularity,
      vote_average: movie.vote_average,
      vote_count: movie.vote_count,
    }));

    return res.status(200).json({data: favoritedMovies });
    
  } catch (error) {
    res.status(500).json({ error: "Error while getting the list" });
  }
}