import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

export const getWeather = async (city) => {
  try {
    // Get geographical coordinates for the city
    const geoResponse = await axios.get(`${API_BASE_URL}/geo/1.0/direct`, {
      params: {
        q: city,
        limit: 1,
        appid: API_KEY,
      },
    });

    // Check if the city was found

    if (geoResponse.data.length === 0) {
      throw new Error("City not found. Please check the name.");
    }

    const { lat, lon } = geoResponse.data[0];
    const weatherResponse = await axios.get(
      `${API_BASE_URL}/data/2.5/forecast`,
      {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: "metric",
        },
      }
    );
    console.log(`Weather API URL: ${weatherResponse.config.url}`); // Log the request URL
    console.log(weatherResponse.data); // Debugging output
    return weatherResponse.data; // This will contain the 5-day forecast data
  } catch (error) {
    throw new Error(
      "Could not retrieve weather data. Please check the city name."
    );
  }
};
