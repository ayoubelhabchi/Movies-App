import axios from "axios";
import { Server_Base_url } from "../tools/serverBaseUrl";

const token = localStorage.getItem('token')

export const favoriteMovies = async (dataMovies) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(dataMovies);
  const movieId = dataMovies.id;
  try {
    const response = await axios.post(
      `${Server_Base_url}movies/favorites/${movieId}`,
      dataMovies,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error while favoriting", error);
    throw error;
  }
};

export const watchlistMovies = async (dataMovies) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(dataMovies);
  const movieId = dataMovies.id;
  try {
    const response = await axios.post(
      `${Server_Base_url}movies/add-watchlist/${movieId}`,
      dataMovies,
      config
    );
    // console.log("Movie Favorited", response.data);
    return response.data;
  } catch (error) {
    console.error("Error while favoriting", error);
    throw error;
  }
};

export const checkWatchlistMovies = async (id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(
      `${Server_Base_url}movies/watchlists/check/movie/${id}`,
      id,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error while checking", error);
    throw error;
  }
};

export const checkFavoriteMovies = async (id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(
      `${Server_Base_url}movies/favorites/check/movie/${id}`,
      id,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error while checking", error);
    throw error;
  }
};

export const deleteMovieList = async (id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // const movieId = dataMovies.id
  try {
    const response = await axios.post(
      `${Server_Base_url}movies/favorites/remove/movie/${id}`,
      id,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error while registering", error);
    throw error;
  }
};

export const getFavoriteMoviesList = async () => {

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(
      `${Server_Base_url}movies/favorites/list`,config
    );
    return response.data.data;
  } catch (error) {
    console.error("Error while getting the lsit", error);
    throw error;
  }
};

export const getWatchlistMoviesList = async () => {

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(
      `${Server_Base_url}movies/watchlist/list`,config
    );
    return response.data.data;
  } catch (error) {
    console.error("Error while getting the lsit", error);
    throw error;
  }
};

export const deleteMovieWatchlist = async (id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // const movieId = dataMovies.id
  try {
    const response = await axios.post(
      `${Server_Base_url}movies/watchlist/remove/movie/${id}`,
      id,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error while registering", error);
    throw error;
  }
};