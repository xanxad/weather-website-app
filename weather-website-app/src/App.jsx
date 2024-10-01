import defaultbg from "./assets/bg-default.jpg";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
const App = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${defaultbg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <div>
        <SearchBar />
        <WeatherCard />
      </div>
    </div>
  );
};

export default App;
