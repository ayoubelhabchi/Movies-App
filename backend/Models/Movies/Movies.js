const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MoviesSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  release_date: {
    type: String,
  },
  poster_path: {
    type: String,
  },

  popularity: {
    type: Number,
  },
  vote_average: {
    type: Number,
  },
  vote_count: {
    type: Number,
  },
});

module.exports = mongoose.model("MoviesFavorites", MoviesSchema);
