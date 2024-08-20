import React, {useEffect,useState} from "react";
import { json } from "react-router-dom";


export async function fetchTrending() {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/trending/all/week?language=en-US&api_key=41ffedf396cc16675a2bc485b84f084e"
      );
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error fetching trends:", error);
      return [];
    }
}

export async function fetchTrendingMovies() {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/trending/movie/week?language=en-US&api_key=41ffedf396cc16675a2bc485b84f084e"
    )
    const data = await response.json()
    return data.results
  } catch (error) {
    console.error("Error while fetching movies",error);
    return [];
  }
}
export async function fetchPopularMovies() {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/discover/movie?language=en-US&api_key=41ffedf396cc16675a2bc485b84f084e"
    )
    const data = await response.json()
    return data.results
  } catch (error) {
    console.error("Error while fetching movies",error);
    return [];
  }
}

export async function fetchTrendingSeries(){
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/trending/tv/week?language=en-US&api_key=41ffedf396cc16675a2bc485b84f084e"
    )
    const data = await response.json()
    return data.results

  } catch (error) {
    console.error("Error while fetching Series",error)
  }
}

export async function fetchSearching(search){
  // console.log(search,"serach");
  
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${search}&language=en-US&api_key=41ffedf396cc16675a2bc485b84f084e`
    )
    const data = await response.json()
    // console.log("data",data);
    
    return data.results


  } catch (error) {
    console.error("Error while fetching data",error)
  }
}

export async function fetchOptionFilter(year, page, highScore, language, certification){
  console.log(year,highScore, certification);
  
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?page=${page}&${certification}&with_origin_country=${language}&primary_release_year=${year}&sort_by=${highScore}&&api_key=41ffedf396cc16675a2bc485b84f084e`
    )
    const data = await response.json()
    // console.log("data",data);
    
    return data.results


  } catch (error) {
    console.error("Error while fetching data",error)
  }
}

function ApiServices() {

  return (
    <div></div>
  )
}

export default ApiServices