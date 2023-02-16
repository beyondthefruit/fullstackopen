import Country from './country';
import List from './list';
const Countries = ({
  countryFilt,
  objectMapPP,
  handleClick,
  setToggle,
  toggle,
  filt,
}) => {
  console.log(toggle);

  if (countryFilt.length > 10 && countryFilt.length < 180) {
    return 'too many matches, specify another filter';
  }
  if (countryFilt.length <= 10 && countryFilt.length > 1) {
    return (
      <>
        <ul>
          {countryFilt.map((country) => {
            return (
              <List
                key={country.name.common}
                {...country}
                handleClick={handleClick}
                country={country}
                setToggle={setToggle}
                toggle={toggle}
              />
            );
          })}
        </ul>
        <div>
          {toggle &&
            filt.map((country) => {
              console.log(country);
              return <Country key={country.name.common} {...country} />;
            })}
        </div>
      </>
    );
  }

  if (countryFilt.length < 2) {
    return (
      <div>
        {countryFilt.map((country) => {
          console.log(country);
          return <Country key={country.name.common} {...country} />;
        })}
      </div>
    );
  }
};

export default Countries;
