import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          placeholder="Search location"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-white bg-opacity-20 rounded-full py-2 pl-4 pr-10 text-white placeholder-black"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black"
        >
          <FaSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
