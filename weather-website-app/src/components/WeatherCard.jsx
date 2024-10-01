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
    Clear: <WiDaySunny className="text-6xl mr-4" />,
    Rain: <WiRain className="text-6xl mr-4" />,
    Snow: <WiSnow className="text-6xl mr-4" />,
    Clouds: <WiCloudy className="text-6xl mr-4" />,
    Default: <WiDayFog className="text-6xl mr-4" />, // Default icon if the condition is not recognized
  };

  const currentWeather = data.weather[0].main; // Extract the current weather condition
  const weatherIcon = weatherIcons[currentWeather] || weatherIcons["Default"]; // Get the appropriate weather icon

  return (
    <div className="bg-black  rounded-lg p-4 text-white">
      <div className="flex items-end mb-4">
        {weatherIcon}

        <h1 className="text-8xl font-bold mr-4">
          {Math.round(data.main.temp)}°C
        </h1>

        <div>
          <h2 className="text-6xl font-semibold">{cityName}</h2>
          {/* Use cityName prop */}
          <p className="text-xl">
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

      <div className="grid grid-cols-2 gap-4 bg-black bg-opacity-50 rounded-lg p-4">
        <div className="flex items-center">
          <WiThermometer className="text-3xl mr-2" />
          <div>
            <p className="font-semibold">Temp Max</p>
            <p>{Math.round(data.main.temp_max)}°</p>
          </div>
        </div>
        <div className="flex items-center">
          <WiThermometer className="text-3xl mr-2" />
          <div>
            <p className="font-semibold">Temp Min</p>
            <p>{Math.round(data.main.temp_min)}°</p>
          </div>
        </div>
        <div className="flex items-center">
          <WiHumidity className="text-3xl mr-2" />
          <div>
            <p className="font-semibold">Humidity</p>
            <p>{data.main.humidity}%</p>
          </div>
        </div>
        <div className="flex items-center">
          <WiCloudy className="text-3xl mr-2" />
          <div>
            <p className="font-semibold">Cloudiness</p>
            <p>{data.clouds.all}%</p>
          </div>
        </div>
        <div className="flex items-center col-span-2">
          <WiStrongWind className="text-3xl mr-2" />
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
