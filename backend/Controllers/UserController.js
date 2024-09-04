const User = require("../Models/User");
const MoviesSchema = require("../Models/Movies");

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
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.addFavoriteMovies = async (req, res) => {
  const {
    user_id,
    movie_id,
    title,
    original_title,
    overview,
    release_date,
    poster_path,
    backdrop_path,
    genre_ids,
    original_language,
    popularity,
    vote_average,
    vote_count,
    adult,
    video,
  } = req.body;

  const userId = req.user._id;

  if (!userId) return res.status(400).json({ message: "User ID is required." });
  if (!movie_id)
    return res.status(400).json({ message: "Movie ID is required." });
  if (!title) return res.status(400).json({ message: "Title is required." });
  if (!original_title)
    return res.status(400).json({ message: "Original title is required." });
  if (!overview)
    return res.status(400).json({ message: "Overview is required." });
  if (!release_date)
    return res.status(400).json({ message: "Release date is required." });
  if (!poster_path)
    return res.status(400).json({ message: "Poster path is required." });
  if (!backdrop_path)
    return res.status(400).json({ message: "Backdrop path is required." });
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
  if (video === undefined)
    return res.status(400).json({ message: "Video flag is required." });

  try {
    const newFavorite = new MoviesSchema({
      user_id: userId,
      movie_id: movie_id,
      title: title,
      original_title: original_title,
      overview: overview,
      release_date: release_date,
      poster_path: poster_path,
      backdrop_path: backdrop_path,
      genre_ids: genre_ids,
      original_language: original_language,
      popularity: popularity,
      vote_average: vote_average,
      vote_count: vote_count,
      adult: adult,
      video: video,
    });
    await newFavorite.save();
    res.status(200).json({ message: "Movie was favorited successfuly" });
  } catch (error) {
    res.status(500).json(error);
  }
};
