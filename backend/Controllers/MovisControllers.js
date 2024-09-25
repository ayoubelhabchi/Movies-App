const MoviesSchema = require("../Models/Movies/Movies");
const favoriteSchema = require("../Models/Movies/MoviesFavorites");
const MoviesWatchlist = require('../Models/Movies/MoviesWatchlist')
const watchlistCheckSchema = require('../Models/Movies/MoviesWatchlistCheck')


//Favoriting Movies

exports.addFavoriteMovies = async (req, res) => {
    const {
      user_id,
      id,
      title,
      release_date,
      poster_path,
      popularity,
      vote_average,
      vote_count,
    } = req.body;
  
    const userId = req.user._id;
  
    if (!userId) return res.status(400).json({ message: "User ID is required." });
    if (!id) return res.status(400).json({ message: "Movie ID is required." });
    if (!title) return res.status(400).json({ message: "Title is required." });
 
    if (!release_date)
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
      const newFavorite = new MoviesSchema({
        user_id: userId,
        id: id,
        title: title,
        release_date: release_date,
        poster_path: poster_path,
        popularity: popularity,
        vote_average: vote_average,
        vote_count: vote_count,
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

  // Watchlist Movies

  exports.addWatchlistMovies = async (req, res) => {
    const {
      user_id,
      id,
      title,
      release_date,
      poster_path,
      popularity,
      vote_average,
      vote_count,
    } = req.body;
  
    const userId = req.user._id;
  
    if (!userId) return res.status(400).json({ message: "User ID is required." });
    if (!id) return res.status(400).json({ message: "Movie ID is required." });
    if (!title) return res.status(400).json({ message: "Title is required." });
 
    if (!release_date)
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
      const newWatchlist = new MoviesWatchlist({
        user_id: userId,
        id: id,
        title: title,
        release_date: release_date,
        poster_path: poster_path,
        popularity: popularity,
        vote_average: vote_average,
        vote_count: vote_count,
      });
      
      const watchlistCheck = new watchlistCheckSchema({ user_id: userId, id: id });
      await newWatchlist.save();
      await watchlistCheck.save();
  
      res.status(200).json({ message: "Added to watchlist" });
    } catch (error) {
      res.status(500).json(error);
    }
  };

  exports.checkMovieWatchlist = async (req, res) => {
    const { movieId } = req.params;
    const userId = req.user._id;
  
    // console.log(movieId,userId);
  
    try {
      const existingWatchlist = await watchlistCheckSchema.findOne({
        user_id: userId,
        id: movieId,
      });
  
      if (existingWatchlist) {
        return res
          .status(200)
          .json({ isAddWatchlist: true });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  exports.getMoviesWatchlistList = async (req,res) => {
    const userId = req.user._id;
    try {
      if (!userId) return res.status(400).json({ message: "User ID is required." });
  
      const watchlistMoviesList = await MoviesWatchlist.find({user_id: userId})
  
      if (watchlistMoviesList.length === 0) {
        return res.status(404).json({ message: "No favorite movies found for this user." });
      }
  
      const watchlistMovies = watchlistMoviesList.map(movie => ({
        user_id: movie.user_id,
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        popularity: movie.popularity,
        vote_average: movie.vote_average,
        vote_count: movie.vote_count,
      }));
  
      return res.status(200).json({data: watchlistMovies });
      
    } catch (error) {
      res.status(500).json({ error: "Error while getting the list" });
    }
  }

  exports.deleteMovieWatchlist = async (req, res) => {
    const { movieId } = req.params;
    const userId = req.user._id;
  
    try {
      const existingWatchlist = await MoviesWatchlist.findOne({
        user_id: userId,
        id: movieId,
      });
  
      if (existingWatchlist) {
        await MoviesWatchlist.deleteOne({ user_id: userId, id: movieId });
        await watchlistCheckSchema.deleteOne({ user_id: userId, id: movieId });
        return res
          .status(200)
          .json({ message: "Removed from watchlist" });
  
      } else {
        return res.status(404).json({message: "Could not find movie with that ID"})
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };