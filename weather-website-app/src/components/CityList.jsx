import { useEffect, useState } from "react";
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiDayFog } from "react-icons/wi";
import { getWeather } from "../services/weatherServices"; // Import the getWeather function

import romeImage from "../assets/rome.jpg";
import londonImage from "../assets/london.jpg";
import newYorkImage from "../assets/new-york.jpg"; // Ensure this filename is correct
import parisImage from "../assets/paris.jpg";

const cities = [
  { name: "Rome", image: romeImage },
  { name: "London", image: londonImage },
  { name: "New York", image: newYorkImage },
  { name: "Paris", image: parisImage },
];

const weatherIcons = {
  Clear: <WiDaySunny className="text-3xl" />,
  Clouds: <WiCloudy className="text-3xl" />,
  Rain: <WiRain className="text-3xl" />,
  Snow: <WiSnow className="text-3xl" />,
  Default: <WiDayFog className="text-3xl" />,
};

const CityList = ({ onSelectCity }) => {
  const [cityWeather, setCityWeather] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const weatherData = await Promise.all(
        cities.map(async (city) => {
          try {
            // Use getWeather function to fetch weather data
            const data = await getWeather(city.name);

            return {
              name: city.name,
              temp: Math.round(data.list[0].main.temp), // Get the temperature from the forecast data
              weather: data.list[0].weather[0].main, // Get the main weather condition
            };
          } catch (error) {
            console.error(`Error fetching weather for ${city.name}:`, error);
            return {
              name: city.name,
              temp: "N/A",
              weather: "Unknown",
            };
          }
        })
      );
      setCityWeather(weatherData);
    };

    fetchWeatherData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-48">
      {cityWeather.map((city, index) => (
        <div
          key={index}
          onClick={() => onSelectCity(city.name)}
          className="cursor-pointer bg-black text-white rounded-lg p-4"
        >
          <img
            src={cities[index].image}
            alt={city.name}
            className="w-full h-40 object-cover rounded"
          />
          <div className="flex justify-between items-center mt-2">
            <h3 className="text-xl font-semibold">{city.name}</h3>
            <div>{weatherIcons[city.weather] || weatherIcons["Default"]}</div>
          </div>
          <p className="text-lg font-semibold">{city.temp}°C</p>
        </div>
      ))}
    </div>
  );
};

export default CityList;
