import React, { useState, useEffect } from "react";
import ForecastCard from "../components/ForecastCard/ForecastCard";
import SearchBar from "../components/SearchBar/SearchBar";

const API_KEY = "c9f5d00eb280e5c6317c743c8fcfec26";

const Home = () => {
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("Stockholm");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setCurrentWeather(data);
      })
      .catch((err) => console.error("Error fetching weather:", err));
  }, [city]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
          )
            .then((response) => response.json())
            .then((data) => {
              setCity(data.name);
              setCurrentWeather(data);
            })
            .catch((err) => console.error("Location Error:", err));
        },
        (error) => console.error("Geolocation Error:", error)
      );
    }
  }, []);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        if (!data.list) {
          throw new Error("Väderdata saknas i API-svaret!");
        }

        // Gruppar prognoser efter datum och tar en per dag
        const uniqueDays = {};
        const dailyForecasts = data.list.filter((forecast) => {
            const date = new Date(forecast.dt * 1000).toISOString().split("T")[0]; // YYYY-MM-DD format
            if (!uniqueDays[date]) {
              uniqueDays[date] = true;
              return true;
            }
            return false;
          }).slice(0, 6); // Hämtar exakt 6 dagar
        setForecast(dailyForecasts);
      })
      .catch((err) => setError(err.message));
  }, [city]);

  const addFavorite = () => {
    if (!favorites.includes(city)) {
      const updatedFavorites = [...favorites, city];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  const removeFavorite = (favCity) => {
    const updatedFavorites = favorites.filter(city => city !== favCity);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleFavoriteClick = (favCity) => {
    setCity(favCity);
    
    
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${favCity}&units=metric&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setCurrentWeather(data); 
      })
      .catch((err) => console.error("Error fetching weather:", err));
  };
  

  return (
    <div className="weather-app">
      <header className="header">
        <SearchBar onSearch={setCity} />
        <button className="fav-button" onClick={addFavorite}>Lägg till Favorit</button>
      </header>
      <div className="favorites-container">
        {favorites.map((favCity, index) => (
          <div key={index} className="fav-item">
            <button className="fav-city" onClick={() => handleFavoriteClick(favCity)}>
              {favCity}
            </button>
            <button className="remove-fav" onClick={() => removeFavorite(favCity)}>❌</button>
          </div>
        ))}
      </div>
      {currentWeather && (
        <div className="current-weather">
          <h2>{currentWeather.name}</h2>
          <p>{Math.round(currentWeather.main.temp)}°C</p>
          <p>{currentWeather.weather[0].description}</p>
        </div>
      )}
      <div className="forecast-container">
        {error ? (
          <p style={{ color: "red" }}>Fel: {error}</p>
        ) : (
          forecast.map((day, index) => (
            <ForecastCard
              key={index}
              date={new Date(day.dt * 1000).toLocaleDateString()}
              minTemp={day.main.temp_min}
              maxTemp={day.main.temp_max}
              icon={day.weather[0].icon}
              description={day.weather[0].description}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
