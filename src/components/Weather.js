import React, { useEffect, useState } from 'react';

const WeatherComponent = () => {
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey = '73d42074aede0b99cf600647722fc931';
        let url;

        if (cityName) {
          url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
        } else {
          // Use browser geolocation to get the user's coordinates
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
              fetchData(url);
            },
            (error) => {
              console.error('Error getting geolocation:', error);
            }
          );
        }

        if (url) {
          fetchData(url);
        }
      } catch (error) {
        console.error('My Error ', error);
      }
    };

    fetchWeatherData();
  }, [cityName]);

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      data.main.temp = ((data.main.temp * 9) / 5 + 32).toFixed(2);
      data.main.feels_like = ((data.main.feels_like * 9) / 5 + 32).toFixed(2);
      data.main.temp_max = ((data.main.temp_max * 9) / 5 + 32).toFixed(2);
      data.main.temp_min = ((data.main.temp_min * 9) / 5 + 32).toFixed(2);
      data.weather[0].description =
        data.weather[0].description.charAt(0).toUpperCase() +
        data.weather[0].description.slice(1).toLowerCase();
      console.log(data);
      setWeatherData(data);
    } catch (error) {
      console.error('My Error ', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setCityName(event.target.elements.city.value);
  };
  return (
    <div className="weather__data">
      <form onSubmit={handleSubmit}>
        <label htmlFor="city">Enter City:</label>
        <input type="text" id="city" name="city" />
        <button type="submit">Get Weather</button>
      </form>

      {weatherData ? (
        <div>
          <h2>Weather in {weatherData.name}</h2>
          <p className="weather__textMain">
            {' '}
            Current Weather: {weatherData.weather[0].description}
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
              alt="Weather Icon"
            />
          </p>
          <p className="weather__text0">Temperature: {weatherData.main.temp}°F</p>
          <p className="weather__text1">Feels like: {weatherData.main.feels_like}°F</p>
          <p className="weather__text2">Max Temp: {weatherData.main.temp_max}°F</p>
          <p className="weather__text3">Min Temp: {weatherData.main.temp_min}°F</p>
          <p className="weather__text4">Humidity: {weatherData.main.humidity}%</p>
          <p className="weather__text5">Wind Speed: {weatherData.wind.speed}</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default WeatherComponent;
