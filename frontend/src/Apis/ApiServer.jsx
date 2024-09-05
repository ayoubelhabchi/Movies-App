import axios from "axios";
import { Server_Base_url } from "../tools/serverBaseUrl";


export const favoriteMovies = async (dataMovies) => {
  


  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(dataMovies.id);
  const movieId = dataMovies.id;
  try {
    const response = await axios.post(
      `${Server_Base_url}user/movies/favorites/${movieId}`,
      dataMovies,
      config
    );
    console.log("Movie Favorited", response.data);
    return response.data;
  } catch (error) {
    console.error("Error while registering", error);
    throw error;
  }
};

export const checkFavoriteMovies = async (id) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmQ5YTUyNjQ2MTc3Y2U0YzRjODY2YmUiLCJpYXQiOjE3MjU1NjA1OTUsImV4cCI6MTcyNTY0Njk5NX0.f8Y7pnoznSrNwbEDlxVr7n-qaOfRRK2AMxTZAVM9Y6o";

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // const movieId = dataMovies.id
  try {
    const response = await axios.post(
      `${Server_Base_url}user/favorites/check/movie/${id}`,
      id,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error while registering", error);
    throw error;
  }
};
