import axios from 'axios';
const baseUrl = 'http://localhost:3003/persons';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);

  return request.then((response) => response.data);
};

const deletePhone = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

// axios.interceptors.response.use(null, (error) => {
//   if (error.response && error.response.status === 401) {
//     window.location = '<login-url>';
//   }
//   throw error;
// });
// axios.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err.response.status === 404) {
//       throw new Error(`${err.config.url} not found`);
//     }
//     throw err;
//   }
// );

export default { getAll, create, update, deletePhone };
