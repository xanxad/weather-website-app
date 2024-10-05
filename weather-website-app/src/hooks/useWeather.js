import { useState, useEffect, useCallback } from "react";
import { getWeather } from "../services/weatherServices";

const useWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch weather data for a specific city
  const fetchWeather = useCallback(async (city) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getWeather(city); // Call the service to get weather data
      setWeatherData(data); // Set the weather data state
    } catch (err) {
      setError("Could not retrieve weather data."); // Set an appropriate error message
    } finally {
      setLoading(false);
    }
  }, []);

  // Automatically fetch weather data every 10 minutes for the selected city
  useEffect(() => {
    let intervalId;
    if (weatherData) {
      intervalId = setInterval(() => {
        fetchWeather(weatherData.city.name); // Fetch data for the current city every 10 minutes
      }, 600000); // 10 minutes
    }

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, [weatherData, fetchWeather]);

  return { weatherData, loading, error, fetchWeather };
};

export default useWeather;
