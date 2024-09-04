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
