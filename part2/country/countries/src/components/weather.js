import React, { useState, useEffect } from 'react';
import countryService from '../services/countryservice';

const Weather = ({ capital, country }) => {
  const [weather, setWeather] = useState([]);
  const [meteo, setMeteo] = useState(false);
  console.log(weather);
  const cap = 'Paris';
  const hookWeather = () => {
    countryService
      .getApi(capital)

      .then((initial) => {
        console.log(initial);
        setWeather(initial);
        setMeteo(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(hookWeather, []);
  console.log(weather);
  // console.log(weather?.weather[0].icon);
  return (
    <>
      <h2>Weather</h2>
      {/* <div>{meteo && <p>{weather?.weather.temp}</p>}</div> */}
      {/* <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
      ></img> */}
      {/* {Object.values(weather).map((wea) => {
        console.log(wea);
        // console.log(wea?.weather.icon);
        return ( */}
      {/* <> */}
      {/* <p>{weather?.name}</p>
        <p>temperature {weather?.temp}</p>
        <p>humidity {weather?.humidity}</p> */}
      {/* <p>{wea?.description}</p> */}
      {/* <img
              src={`http://openweathermap.org/img/wn/${wea.icon}@2x.png`}
            ></img> */}
      {/* </> */}
      {/* // <img */}
      {/* //   src={`http://openweathermap.org/img/wn/${wea.weather.icon}@2x.png`}
          // ></img> */}
      {/* );
      })} */}
      {/* <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
       ></img> */}
    </>
  );
};

export default Weather;
