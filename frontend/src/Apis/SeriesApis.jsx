import axios from "axios";
import { Server_Base_url } from "../tools/serverBaseUrl";

const token = localStorage.getItem('token')


export const favoriteSeries = async (dataSeries) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(dataSeries);
    const seriesId = dataSeries.id;
    try {
      const response = await axios.post(
        `${Server_Base_url}series/favorites/${seriesId}`,
        dataSeries,
        config
      );
      // console.log("Movie Favorited", response.data);
      return response.data;
    } catch (error) {
      console.error("Error while favoriting", error);
      throw error;
    }
  };


  export const checkFavoriteSeries = async (id) => {
    console.log(id);
    
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    try {
      const response = await axios.post(
        `${Server_Base_url}series/favorites/check/series/${id}`,
        id,
        config
      );
      return response.data;
    } catch (error) {
      console.error("Error while checking", error);
      throw error;
    }
  };

  export const deleteSeriesList = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    // const movieId = dataMovies.id
    try {
      const response = await axios.post(
        `${Server_Base_url}series/favorites/remove/sereis/${id}`,
        id,
        config
      );
      return response.data;
    } catch (error) {
      console.error("Error while registering", error);
      throw error;
    }
  };
  
  export const getFavoriteSeriesList = async () => {
  
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    try {
      const response = await axios.get(
        `${Server_Base_url}series/favorites/list`,config
      );
      return response.data.data;
    } catch (error) {
      console.error("Error while getting the lsit", error);
      throw error;
    }
  };