import { WiSnow, WiDaySunny, WiRain, WiCloudy } from "react-icons/wi";

const WeatherForecast = ({ forecast }) => {
  // Check if forecast data is available
  if (!forecast || !Array.isArray(forecast) || forecast.length === 0) {
    return (
      <div className=" bg-slate-800 rounded-lg p-4 text-white">
        <h3 className="text-xl font-semibold mb-2">No forecast available.</h3>
      </div>
    );
  }

  // Map weather condition to icons
  const weatherIcons = {
    Clear: <WiDaySunny className="text-2xl mr-2" />,
    Rain: <WiRain className="text-2xl mr-2" />,
    Snow: <WiSnow className="text-2xl mr-2" />,
    Clouds: <WiCloudy className="text-2xl mr-2" />,
    Default: <WiCloudy className="text-2xl mr-2" />, // Fallback icon
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
    return dailyForecast;
  };
  // Get the filtered daily forecast

  const dailyForecast = getDailyForecast(forecast);

  return (
    <div className="bg-white opacity-60 rounded-lg p-4 md:p-6 text-blue-900 w-full max-w-full md:max-w-[700px] ">
      <h3 className="text-xl md:text-2xl font-semibold mb-2 text-center">
        5-Day Weather Forecast
      </h3>
      <div className="space-y-2">
        {dailyForecast.map((item, index) => (
          <div
            key={index}
            className="flex flex-row md:flex-row justify-between items-start space-x-4 md:items-center space-y-1 md:space-y-0"
          >
            <div className="flex items-center">
              {/* Display corresponding icon */}
              {weatherIcons[item.weather[0].main] || weatherIcons["Default"]}
              {/* Display the day of the week */}
              <span className="ml-2">
                {new Date(item.dt * 1000).toLocaleDateString("en-US", {
                  weekday: "long",
                })}
              </span>
              <span className="ml-2">{item.weather[0].description}</span>
            </div>
            <span>{Math.round(item.main.temp)}°C</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
