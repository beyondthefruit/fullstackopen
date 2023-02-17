import axios from 'axios';
const baseUrl = 'https://restcountries.com/v3.1/all';
const apiUrl = 'https://api.openweathermap.org/data/2.5';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getApi = () => {
  const ACCESS_KEY = process.env.REACT_APP_API_KEY;
  const request = axios.get(`${apiUrl}?access_key=${ACCESS_KEY}`);

  return request.then((response) => response.data);
};

export default { getAll, getApi };
