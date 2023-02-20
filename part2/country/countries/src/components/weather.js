import React, { useState, useEffect } from 'react';
import countryService from '../services/countryservice';

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null);

  const hookWeather = () => {
    if (capital) {
      countryService
        .getApi(capital)

        .then((initial) => {
          console.log(initial);
          setWeather(initial);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  useEffect(hookWeather, [capital]);

  return (
    <>
      <h2>Weather today</h2>

      <p>temperature {weather?.main.temp}°C</p>

      <img
        src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
      ></img>
    </>
  );
};

export default Weather;
