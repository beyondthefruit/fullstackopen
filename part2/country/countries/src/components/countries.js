import Country from './country';
const Countries = ({ countryFilt }) => {
  // const languages = {
  //   fra: 'French',
  //   gsw: 'Swiss German',
  //   ita: 'Italian',
  //   roh: 'Romansh',
  // };
  const objectMap = (c) => {
    for (const [a, b] of Object.entries(c)) {
      // b.map((lang) => {
      //   return <p>{lang}</p>;
      // });
      // console.log(`${b}`);
      // return <p>{b}</p>;
    }
    return;
  };
  const objectMapPP = (c) => {
    Object.entries(c).map((e) => {
      console.log(e[1]);
      <p>{e[1]}</p>;
    });
  };
  {
    /* {
   //    console.log(`${b}`);
   //    // return <p>{b}</p>;
   //  }
  }; */
  }
  {
    /* objectMap(languages); */
  }

  const numberOfCountries = (e) => {
    if (e.length > 10 && e.length < 180) {
      return 'too many matches, specify another filter';
    }
    if (e.length <= 10 && e.length > 1) {
      return (
        <ul>
          {e.map((country) => (
            <li key={country.name.common}> {country.name.common} </li>
          ))}
        </ul>
      );
    }
    if (e.length < 2) {
      return (
        <div>
          {e.map((country) => {
            console.log(country);
            // console.log(country.languages);
            const { capital, flags, population, area, languages } = country;
            const nameC = country.name.common;
            const flag = flags.png;
            return (
              <div key={nameC}>
                <h3>{nameC} </h3>
                <p>capital: {capital}</p>
                <p>area: {area}</p>
                <h5>languages:</h5>
                {/* {objectMap(languages)} */}
                <div>{objectMapPP(languages)}</div>
                <img src={flag} alt={nameC}></img>
                {/* <p>{languages}</p> */}
                {/* console.log(languages); */}
                {/* {country.languages.map((lang) => {
                  console.log(lang.name);
                  // return <li>{lang}</li>;
                })} */}
              </div>
            );
          })}
        </div>
      );
    }
    // {
    //   e.map((country) => {
    //     return <li> {country.name.common} </li>;
    //   });
    // }
    return;
  };
  return (
    <>
      <div>{numberOfCountries(countryFilt)}</div>
    </>
  );
};

export default Countries;
