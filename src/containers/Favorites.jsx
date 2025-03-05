

import React, { useState } from "react";

const Favorites = () => {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  return (
    <div>
      <h2>Mina Favoriter</h2>
      {favorites.map((city, index) => (
        <button key={index}>{city}</button>
      ))}
    </div>
  );
};

export default Favorites;
