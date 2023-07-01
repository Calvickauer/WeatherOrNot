import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyComponent = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3/all');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div>
      <h1>List of Countries</h1>
      <ul>
        {countries.map((country) => (
          <li key={country.name.common}><a href='/'>{country.name.common}</a></li>
        ))}
      </ul>
    </div>
  );
};

export default MyComponent;
