import axios from "axios";
import { Server_Base_url } from "../tools/serverBaseUrl";


export const signUp = async (formData) => {
  try {
    const response = await axios.post(
      `${Server_Base_url}auth/signup`,
      formData
    );
    console.log("Registration successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error while registering", error);
    throw error;
  }
};

export const favoriteMovies = async (dataMovies) => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmQ5YTUyNjQ2MTc3Y2U0YzRjODY2YmUiLCJpYXQiOjE3MjU1NDEyMDcsImV4cCI6MTcyNTYyNzYwN30.ALDBTve0EAMq3HoHppKlaQrbGcreH8sJRXNA3goaKfI"

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(token);
  try {
    const response = await axios.post(
      `${Server_Base_url}user/movie-to-favorites`,
      dataMovies,config
    );
    console.log("Movie Favorited", response.data);
    return response.data;
  } catch (error) {
    console.error("Error while registering", error);
    throw error;
  }
};
