const User = require("../Models/User");

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

  try {
    
  } catch (error) {
    
  }
};
