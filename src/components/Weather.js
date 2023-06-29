import React, { useEffect, useState } from 'react';

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const latitude = 36.593531; // Example latitude
        const longitude = -121.893592; // Example longitude
        const apiKey = '73d42074aede0b99cf600647722fc931'; // Enclose the API key in quotes

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        console.log(data);
        data.main.temp = (data.main.temp * 9/5) + 32;
        data.main.feels_like = (data.main.feels_like * 9/5) + 32;
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
          <h2>Weather in {weatherData.name}, California!</h2>
          <p className='weather__text'> Current Weather: {weatherData.weather[0].description}</p>
          <p className='weather__text'>Temperature: {weatherData.main.temp}°F</p>
          <p className='weather__text'>Feels like: {weatherData.main.feels_like}°F</p>
          <p className='weather__text'>Humidity: {weatherData.main.humidity}%</p>
          {/* Display additional weather information as needed */}
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default WeatherComponent;
