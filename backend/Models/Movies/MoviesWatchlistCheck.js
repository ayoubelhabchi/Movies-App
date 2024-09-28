const mongoose = require('mongoose');
const { Schema } = mongoose;

const watchlistCheckSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  id: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// favoriteSchema.index({ user_id: 1, id: 1 }, { unique: true });



module.exports = mongoose.model('check Watchlist movies', watchlistCheckSchema);
