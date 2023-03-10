import axios from 'axios';
const baseUrl = 'https://restcountries.com/v3.1/all';
const apiUrl = 'https://api.openweathermap.org/data/2.5';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getApi = (capital) => {
  const api_key = process.env.REACT_APP_API_KEY;
  const request = axios.get(
    `${apiUrl}/weather?q=${capital}&appid=${api_key}&units=metric`
  );

  return request.then((response) => response.data);
};

export default { getAll, getApi };
