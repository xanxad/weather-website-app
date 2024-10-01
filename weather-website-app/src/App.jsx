import defaultbg from "./assets/bg-default.jpg";
import SearchBar from "./components/SearchBar";
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
      </div>
    </div>
  );
};

export default App;
