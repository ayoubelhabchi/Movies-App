import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Anime from "../Pages/Animation/Anime";
const Base_Url = `https://api.themoviedb.org/3/`;
const Api_Key = `41ffedf396cc16675a2bc485b84f084e`;
const Discover_Api = `discover/movie?`;
const Discover_Tv_Api = `discover/tv?`;

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
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error while fetching movies", error);
    return [];
  }
}
export async function fetchPopularMovies() {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/discover/movie?language=en-US&api_key=41ffedf396cc16675a2bc485b84f084e"
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error while fetching movies", error);
    return [];
  }
}

export async function fetchTrendingSeries() {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/trending/tv/week?language=en-US&api_key=41ffedf396cc16675a2bc485b84f084e"
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error while fetching Series", error);
  }
}

export async function fetchSearching(search) {
  // console.log(search,"serach");

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${search}&language=en-US&api_key=41ffedf396cc16675a2bc485b84f084e`
    );
    const data = await response.json();
    // console.log("data",data);

    return data.results;
  } catch (error) {
    console.error("Error while fetching data", error);
  }
}

export async function fetchMoviesOptionFilter(
  search,
  year,
  page = 1,
  sort,
  provider,
  language,
  country,
  certification,
  genres
) {
  try {
    page = Math.max(1, Math.min(page, 500));

    let query = `${Base_Url}${
      search ? `search/movie?query=${search}&` : Discover_Api
    }api_key=${Api_Key}&page=${page}`;

    if (year) query += `&primary_release_year=${year}`;
    if (sort) query += `&sort_by=${sort}`;
    if (provider) query += `&watch_region=US&with_watch_providers=${provider}`;
    if (language) query += `&with_origin_country=${language}`;
    if (country) query += `&with_origin_country=${country}`;
    if (certification) query += `&${certification}`;
    if (genres) query += `&with_genres=${genres.join(",")}`;

    const response = await fetch(query);
    const data = await response.json();
    
    return {
      movies: data.results,
      totalPages: Math.min(data.total_pages, 500),
    };
  } catch (error) {
    console.error("Error while fetching data", error);
    return { movies: [], totalPages: 1 };
  }
}

export async function fetchSeriesOptionFilter(
  search,
  year,
  page = 1,
  highScore,
  language,
  country,
  status,
  genres
) {
  try {
    page = Math.max(1, Math.min(page, 500));

    let query = `${Base_Url}${
      search ? `search/tv?query=${search}&` : Discover_Tv_Api
    }api_key=${Api_Key}&page=${page}`;

    if (year) query += `&first_air_date_year=${year}`;
    if (highScore) query += `&sort_by=${highScore}`;
    if (country) query += `&with_origin_country=${country}`;
    if (language) query += `&with_original_language=${language}`;
    if (status) query += `&with_status=${status}`;
    if (genres) query += `&with_genres=${genres.join(",")}`;

    // console.log("API Request URL:", query);

    const response = await fetch(query);
    const data = await response.json();

    return {
      movies: data.results,
      totalPages: Math.min(data.total_pages, 500),
    };
  } catch (error) {
    console.error("Error while fetching data", error);
    return { movies: [], totalPages: 1 };
  }
}

export async function fetchAnimeOptionFilter(
  search,
  year,
  page = 1,
  highScore,
  language,
  country,
  status,
  genres
) {
  try {
    page = Math.max(1, Math.min(page, 500));
    const fixedGenres = [16, 10765];

    let query = `${Base_Url}${
      search ? `search/tv?query=${search}&` : Discover_Tv_Api
    }api_key=${Api_Key}&page=${page}`;

    if (year) query += `&first_air_date_year=${year}`;
    if (highScore) query += `&sort_by=${highScore}`;
    if (country) query += `&with_origin_country=${country}`;
    if (language) query += `&with_original_language=${language}`;
    if (status) query += `&with_status=${status}`;
    if (genres && genres.length > 0) {
      const allGenres = [...new Set([...fixedGenres, ...genres])];
      query += `&with_genres=${allGenres.join(",")}`;
    } else {
      query += `&with_genres=${fixedGenres.join(",")}`;
    }

    // console.log("API Request URL:", query);

    const response = await fetch(query);
    const data = await response.json();

    return {
      animes: data.results,
      totalPages: Math.min(data.total_pages, 500),
    };
  } catch (error) {
    console.error("Error while fetching data", error);
    return { animes: [], totalPages: 1 };
  }
}
export async function fetchById(id) {
  try {
    let query = `${Base_Url}movie/${id}?api_key=${Api_Key}&append_to_response=credits%2Ccrew%2Cvideos`;

    // console.log("API Request URL:", query);

    const response = await fetch(query);
    const data = await response.json();

    return {
      details: data,
    };
  } catch (error) {
    console.error("Error while fetching data", error);
    return { details: [], totalPages: 1 };
  }
}

export async function fetchSeriesById(id) {
  console.log("fetchSeriesById", id);

  try {
    let query = `${Base_Url}tv/${id}?api_key=${Api_Key}&append_to_response=credits%2Ccrew%2Cvideos`;

    const response = await fetch(query);
    const data = await response.json();

    return {
      details: data,
    };
  } catch (error) {
    console.error("Error while fetching data", error);
    return { details: [], totalPages: 1 };
  }
}

export async function fetchSeasonsAndEpisodes(id, season_number) {
  try {
    let query = `${Base_Url}tv/${id}/season/${season_number}?api_key=${Api_Key}&append_to_response=images%2Cvideos%2Ccredits`;

    const response = await fetch(query);
    const data = await response.json();

    return {
      details: data,
    };
  } catch (error) {
    console.error("Error while fetching data", error);
    return { details: [], totalPages: 1 };
  }
}

function ApiServices() {
  return <div></div>;
}

export default ApiServices;
