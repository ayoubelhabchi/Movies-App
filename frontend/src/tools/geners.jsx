const genreMapMovies = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" }
  ];

  const genreMapTv = [
    { id: 10759, name: "Action & Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 10762, name: "Kids" },
    { id: 9648, name: "Mystery" },
    { id: 10763, name: "News" },
    { id: 10764, name: "Reality" },
    { id: 10765, name: "Sci-Fi & Fantasy" },
    { id: 10766, name: "Soap" },
    { id: 10767, name: "Talk" },
    { id: 10768, name: "War & Politics" },
    { id: 37, name: "Western" }
  ];
  


  const genreColors = {
    //Tv genres
    10759: "#ff5733", // Action & Adventure
    16: "#f5a623", // Animation
    35: "#ff33a8", // Comedy
    80: "#900c3f", // Crime
    99: "#33ff57", // Documentary
    18: "#2e86c1", // Drama
    10751: "#ffbd33", // Family
    10762: "#ff6f61", // Kids
    9648: "#1abc9c", // Mystery
    10763: "#8e44ad", // News
    10764: "#c0392b", // Reality
    10765: "#2980b9", // Sci-Fi & Fantasy
    10766: "#27ae60", // Soap
    10767: "#d35400", // Talk
    10768: "#34495e", // War & Politics
    37: "#d35400", // Western
  
    // Movies genres
    28: "#ff5733", // Action
    12: "#33c4ff", // Adventure
    14: "#8e44ad", // Fantasy
    36: "#c0392b", // History
    27: "#581845", // Horror
    10402: "#d35400", // Music
    10749: "#e74c3c", // Romance
    878: "#2980b9", // Science Fiction
    10770: "#27ae60", // TV Movie
    53: "#7f8c8d", // Thriller
    10752: "#34495e", // War
  };
  

  export {genreColors,genreMapMovies, genreMapTv}
