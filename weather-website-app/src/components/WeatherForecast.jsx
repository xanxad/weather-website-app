import { WiSnow, WiDaySunny, WiRain, WiCloudy } from "react-icons/wi";

const WeatherForecast = ({ forecast }) => {
  // Check if forecast data is available
  if (!forecast || !Array.isArray(forecast) || forecast.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6 text-blue-900">
        <h3 className="text-xl font-semibold mb-2">No forecast available.</h3>
      </div>
    );
  }

  // Map weather condition to icons
  const weatherIcons = {
    Clear: <WiDaySunny className="text-4xl text-yellow-500" />,
    Rain: <WiRain className="text-4xl text-blue-500" />,
    Snow: <WiSnow className="text-4xl text-blue-200" />,
    Clouds: <WiCloudy className="text-4xl text-gray-500" />,
    Default: <WiCloudy className="text-4xl text-gray-400" />,
  };

  // Function to get the first forecast for each day

  const getDailyForecast = (forecast) => {
    const dailyForecast = [];
    const addedDays = new Set();

    forecast.forEach((item) => {
      const forecastDate = new Date(item.dt * 1000);
      const day = forecastDate.getDate(); // Get day of the month

      if (!addedDays.has(day)) {
        dailyForecast.push(item); // Add the first occurrence of the day
        addedDays.add(day); // Mark this day as added
      }
    });
    return dailyForecast.slice(0, 5); // Ensure we only return 5 days
  };

  const dailyForecast = getDailyForecast(forecast);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6 text-blue-900 w-full">
      <h3 className="text-2xl font-semibold mb-4 text-center">
        5-Day Forecast
      </h3>
      <div className="space-y-4">
        {dailyForecast.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-white/60 rounded-lg transition-all duration-300 hover:bg-white/80"
          >
            <div className="flex items-center space-x-3">
              {/* Display corresponding icon */}
              {weatherIcons[item.weather[0].main] || weatherIcons["Default"]}
              <div className="flex flex-col">
                <span className="font-semibold">
                  {/* Display the day of the week */}
                  {new Date(item.dt * 1000).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </span>
                <span className="text-sm text-gray-600 capitalize">
                  {item.weather[0].description}
                </span>
              </div>
            </div>
            <span className="text-2xl font-bold">
              {Math.round(item.main.temp)}°C
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
