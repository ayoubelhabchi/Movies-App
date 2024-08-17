import React, {useEffect,useState} from "react";
import { json } from "react-router-dom";


export async function fetchPopularMovies() {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/discover/movie?api_key=41ffedf396cc16675a2bc485b84f084e"
      );
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error fetching popular movies:", error);
      return [];
    }
}


function ApiServices() {

  return (
    <div></div>
  )
}

export default ApiServices