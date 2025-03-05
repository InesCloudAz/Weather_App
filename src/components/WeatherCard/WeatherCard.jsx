
import "./WeatherCard.css";

const WeatherCard = ({ weather }) => {
    if (!weather) return null;
  
    return (
      <div className="weather-card">
        <h2>{weather.name}</h2>
        <p>{Math.round(weather.main.temp)}°C</p>
        <p>{weather.weather[0].description}</p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="Weather Icon" />
      </div>
    );
  };
  
  export default WeatherCard;
  