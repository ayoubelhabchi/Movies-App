const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SeriesSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  first_air_date: {
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

module.exports = mongoose.model("Series Favorites", SeriesSchema);
