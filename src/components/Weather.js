import React, { useEffect, useState } from 'react';


const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const latitude = 36.60109583806752;
        const longitude = -121.86435349064406;
        const apiKey = '73d42074aede0b99cf600647722fc931';

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        console.log(data);
        data.main.temp = ((data.main.temp * 9/5) + 32).toFixed(2);
        data.main.feels_like = ((data.main.feels_like * 9/5) + 32).toFixed(2);
        data.main.temp_max = ((data.main.temp_max * 9/5) + 32).toFixed(2);
        data.main.temp_min = ((data.main.temp_min * 9/5) + 32).toFixed(2);
        data.weather[0].description = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1).toLowerCase();
        console.log(data);
        setWeatherData(data);
      } catch (error) {
        console.error("My Error ", error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div className='weather__data'>
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
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default WeatherComponent;
