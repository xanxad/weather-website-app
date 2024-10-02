import { useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import WeatherForecast from "./components/WeatherForecast";
import ErrorMessage from "./components/ErrorMessage";
import useWeather from "./hooks/useWeather";

// Import the background images
import sunnyBg from "./assets/bg-sunny.jpg";
import rainyBg from "./assets/bg-rainy.jpg";
import snowyBg from "./assets/bg-snow.png";
import cloudyBg from "./assets/bg-cloudy.jpg";
import defaultBg from "./assets/bg-default.jpg";
import errorBg from "./assets/bg-error.jpg";

// Weather condition to background image mapping
const weatherBackgrounds = {
  Clear: sunnyBg,
  Rain: rainyBg,
  Snow: snowyBg,
  Clouds: cloudyBg,
};

function App() {
  const { weatherData, loading, error, fetchWeather } = useWeather();

  // Function to get the appropriate background image
  const getBackgroundImage = (weatherCondition) => {
    return weatherBackgrounds[weatherCondition] || defaultBg;
  };

  // Check if weather data exists and extract the current weather condition
  const currentWeather = weatherData?.list?.[0]?.weather[0]?.main; // Updated for forecast data

  // Get the appropriate background image
  const backgroundImage = error ? errorBg : getBackgroundImage(currentWeather);

  // Automatically fetch weather data every 5 minutes
  useEffect(() => {
    const intervalid = setInterval(() => {
      fetchWeather(); // Call the weather fetching function
    }, 300000); // 300000 milliseconds = 5 minutes

    // Clear interval on component unmount
    return () => clearInterval(intervalid);
  }, [fetchWeather]);

  const cityName = weatherData?.city?.name || "Unknown City";

  return (
    <div
      className="min-h-screen bg-cover bg-center p-8 transition-all duration-500"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Weather Dashboard</h1>
          <div className="w-64">
            <SearchBar onSearch={fetchWeather} />
          </div>
        </header>

        {/* Display loading message */}
        {loading && <p className="text-white">Loading...</p>}

        {/* Display error message if there's an error */}
        {error && <ErrorMessage message={error} />}

        {/* Display weather data only if there's no error and weather data is available */}
        {!error && weatherData && (
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2">
              <WeatherCard data={weatherData.list[0]} cityName={cityName} />
              {/* Updated for current weather */}
            </div>

            <div>
              <WeatherForecast forecast={weatherData.list} />
              {/* Pass the full forecast */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
