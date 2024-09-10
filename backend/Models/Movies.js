const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MoviesSchema = new Schema({
    user_id: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    id: { 
      type: Number, 
      required: true 
    },
    title: { 
      type: String, 
      required: true 
    },
    original_title: { 
      type: String, 
      required: true 
    },
    overview: { 
      type: String 
    },
    release_date: { 
      type: String 
    },
    poster_path: { 
      type: String 
    },
    
    genre_ids: [{ 
      type: Number 
    }],
    original_language: { 
      type: String 
    },
    popularity: { 
      type: Number 
    },
    vote_average: { 
      type: Number 
    },
    vote_count: { 
      type: Number 
    },
    adult: { 
      type: Boolean 
    }
    
  });
  
  module.exports = mongoose.model('MoviesFavorites', MoviesSchema);
  