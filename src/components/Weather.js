import React, { useEffect, useState } from 'react';

const WeatherComponent = () => {
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey = '73d42074aede0b99cf600647722fc931';

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        data.main.temp = ((data.main.temp * 9 / 5) + 32).toFixed(2);
        data.main.feels_like = ((data.main.feels_like * 9 / 5) + 32).toFixed(2);
        data.main.temp_max = ((data.main.temp_max * 9 / 5) + 32).toFixed(2);
        data.main.temp_min = ((data.main.temp_min * 9 / 5) + 32).toFixed(2);
        data.weather[0].description = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1).toLowerCase();
        console.log(data);
        setWeatherData(data);
      } catch (error) {
        console.error("My Error ", error);
      }
    };

    if (cityName) {
      fetchWeatherData();
    }
  }, [cityName]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Trigger weather data fetching when the form is submitted
    setCityName(event.target.elements.city.value);
  };

  return (
    <div className='weather__data'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="city">Enter City:</label>
        <input type="text" id="city" name="city" />
        <button type="submit">Get Weather</button>
      </form>

      {weatherData ? (
        <div>
          <h2>Weather in {weatherData.name}</h2>
          <p className='weather__text'> Current Weather: {weatherData.weather[0].description}<img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt="Weather Icon" /></p>
          <p className='weather__text'>Temperature: {weatherData.main.temp}°F</p>
          <p className='weather__text'>Feels like: {weatherData.main.feels_like}°F</p>
          <p className='weather__text'>Max Temp: {weatherData.main.temp_max}°F</p>
          <p className='weather__text'>Min Temp: {weatherData.main.temp_min}°F</p>
          <p className='weather__text'>Humidity: {weatherData.main.humidity}%</p>
          <p className='weather__text'>Wind Speed: {weatherData.wind.speed}</p>
        </div>
      ) : (
        <p>Enter a city name to get the weather</p>
      )}
    </div>
  );
};

export default WeatherComponent;
