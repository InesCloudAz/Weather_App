
import { useState } from "react";
import "./SearchBar.css";


const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim() !== "") {
      onSearch(query);
      setQuery("");
    }
  };

  
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Sök stad..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Sök</button>
    </div>
  );
};

export default SearchBar;


