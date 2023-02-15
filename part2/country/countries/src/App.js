import { useState, useEffect } from 'react';
import './index.css';
import countryService from './services/countryservice';
import Search from './components/search';
import Countries from './components/countries';

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredList, setFilteredList] = useState('');

  const hook = () => {
    countryService.getAll().then((initial) => {
      setCountries(initial);
    });
  };
  useEffect(hook, []);

  const filterCountry = (e) => {
    e.preventDefault();
  };

  const handleFilter = (e) => {
    setFilteredList(e.target.value);
  };

  const countryFilt = countries.filter((country) => {
    return country.name.common
      .toLowerCase()
      .includes(filteredList.toLocaleLowerCase());
  });

  return (
    <>
      <Search
        filterCountry={filterCountry}
        handleFilter={handleFilter}
        filteredList={filteredList}
      />
      <Countries countryFilt={countryFilt} />
    </>
  );
}

export default App;
