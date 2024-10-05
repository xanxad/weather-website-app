import {
  WiThermometer,
  WiHumidity,
  WiCloudy,
  WiStrongWind,
  WiDaySunny,
  WiRain,
  WiSnow,
  WiDayFog,
} from "react-icons/wi";

const WeatherCard = ({ data, cityName }) => {
  // Check if weather data is available
  if (!data) {
    return (
      <div>
        <p>No Weather data available.</p>
      </div>
      // render this message if there is no data
    );
  }

  const weatherIcons = {
    Clear: <WiDaySunny className="text-lg md:text-7xl mr-4" />,
    Rain: <WiRain className="text-lg md:text-7xl mr-4" />,
    Snow: <WiSnow className="text-lg md:text-7xl mr-4" />,
    Clouds: <WiCloudy className="text-lg md:text-7xl mr-4" />,
    Default: <WiDayFog className="text-6xl md:text-7xl mr-4" />, // Default icon if the condition is not recognized
  };

  const currentWeather = data.weather[0].main; // Extract the current weather condition
  const weatherIcon = weatherIcons[currentWeather] || weatherIcons["Default"]; // Get the appropriate weather icon

  return (
    <div className="bg-white opacity-60   rounded-lg p-4 md:p-6 text-blue-900 w-full min-h-[400px]  max-w-[700px]">
      <div className="flex flex-col  md:flex-row items-center md:items-end mb-4">
        {weatherIcon}

        <h1 className="text-8xl md:text-9xl font-bold mr-4">
          {Math.round(data.main.temp)}°C
        </h1>

        <div className="text-center md:text-left">
          <h2 className="text-5xl md:text-6xl font-semibold">{cityName}</h2>
          {/* Use cityName prop */}
          <p className="text-lg md:text-xl">
            {new Date().toLocaleString("en-us", {
              hour: "numeric",
              minute: "numeric",
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="flex  md:grid-cols-3 gap-2 bg-white opacity-60 text-black rounded-lg px-4 py-10 ">
        <div className="flex items-center">
          <WiThermometer className="text-3xl md:text-4xl mr-2" />
          <div>
            <p className="font-semibold">Temp Max</p>
            <p>{Math.round(data.main.temp_max)}°</p>
          </div>
        </div>
        <div className="flex items-center">
          <WiThermometer className="text-3xl md:text-4xl mr-2" />
          <div>
            <p className="font-semibold">Temp Min</p>
            <p>{Math.round(data.main.temp_min)}°</p>
          </div>
        </div>
        <div className="flex items-center">
          <WiHumidity className="text-3xl md:text-4xl mr-2" />
          <div>
            <p className="font-semibold">Humidity</p>
            <p>{data.main.humidity}%</p>
          </div>
        </div>

        <div className="flex items-center col-span-2 md:col-span-3">
          <WiStrongWind className="text-3xl md:text-4xl mr-2" />
          <div>
            <p className="font-semibold">Wind Speed</p>
            <p>{data.wind.speed} km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
