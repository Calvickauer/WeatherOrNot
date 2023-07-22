import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherComponent from './Weather';

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3/all');
        const countriesWithData = response.data.filter(
          (country) => country.capital && country.capital.length > 0
        );
        setCountries(countriesWithData);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  // Sort countries alphabetically by common name
  countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

  const handleCountryClick = (event, country) => {
    event.preventDefault();
    setSelectedCountry(country);
    console.log("Selected Country -- :",selectedCountry);
  };

  return (
    <div className='country__choice'>
      {selectedCountry && (
          <div>
          <h2>{selectedCountry.name.common}</h2>
          <p>Region: {selectedCountry.region}</p>
          <p>Subregion: {selectedCountry.subregion}</p>
          <p>Population: {selectedCountry.population}</p>
        </div>
      )}
      {selectedCountry && <WeatherComponent selectedCountry={selectedCountry} />}
      <div className='country__list'>
        <h1>List of Countries</h1>
        <ul>
          {countries.map((country) => (
              <li key={country.name.common} onClick={(event) => handleCountryClick(event, country)}>
              <a href='/'>{country.name.common}</a> {country.flag}
            </li>
          ))}
        </ul>
          </div>
        </div>
  );
};

export default Countries;
