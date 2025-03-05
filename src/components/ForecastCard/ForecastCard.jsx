
import React from "react";
import "./ForecastCard.css";


const ForecastCard = ({ date, minTemp, maxTemp, icon, description }) => {
  const getWeekday = (dateString) => {
    const options = { weekday: "long" }; // Hämtar veckodag i fulltext
    return new Date(dateString).toLocaleDateString("sv-SE", options);
  };

  const today = new Date().toLocaleDateString("sv-SE"); // Hämtar dagens datum
  const isToday = date === today; // Jämför dagens datum med forecast-datumet

  return (
    <div className="forecast-card">
      <h3>{isToday ? "Idag" : getWeekday(date)}</h3> {/* Visar "Idag" om datumet är idag */}
      <p>{date}</p>
      <img src={`https://openweathermap.org/img/wn/${icon}.png`} alt={description} />
      <p>{description}</p>
      <p>Min: {Math.round(minTemp)}°C</p>
      <p>Max: {Math.round(maxTemp)}°C</p>
    </div>
  );
};


export default ForecastCard;

  