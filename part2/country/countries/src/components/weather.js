import React, { useState, useEffect } from 'react';
import countryService from '../services/countryservice';

const Weather = ({}) => {
  const [weather, setWeather] = useState([]);

  const hookWeather = () => {
    countryService.getApi().then((initial) => {
      setWeather(initial);
    });
  };
  useEffect(hookWeather, []);

  return (
    <>
      <h2>Weather</h2>
    </>
  );
};

export default Weather;
