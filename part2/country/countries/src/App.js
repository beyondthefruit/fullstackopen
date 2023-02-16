import { useState, useEffect } from 'react';
import './index.css';
import countryService from './services/countryservice';
import Search from './components/search';
import Countries from './components/countries';

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredList, setFilteredList] = useState('');
  const [selector, setSelector] = useState('');

  const [toggle, setToggle] = useState(false);

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

  //use to filter based on the input
  const countryFilt = countries.filter((country) => {
    // console.log(filteredList);
    return country.name.common
      .toLowerCase()
      .includes(filteredList.toLowerCase());
  });
  //use to filter onClick
  const filt = countries.filter((country) => {
    // console.log(filteredList);
    return country.name.common.toLowerCase().includes(selector.toLowerCase());
  });

  const objectMapPP = (c) => {
    Object.entries(c).map((e) => {
      console.log(e[1]);
      <p>{e[1]}</p>;

      // console.log(langu);
    });
    return;
  };

  //btn click target selection
  const handleClick = (country) => {
    const target = country.name.common;
    // console.log(target);
    return setSelector(target);
  };

  return (
    <>
      <Search
        filterCountry={filterCountry}
        handleFilter={handleFilter}
        filteredList={filteredList}
      />
      <Countries
        countryFilt={countryFilt}
        objectMapPP={objectMapPP}
        handleClick={handleClick}
        selector={selector}
        toggle={toggle}
        setToggle={setToggle}
        filt={filt}
      />
    </>
  );
}

export default App;
