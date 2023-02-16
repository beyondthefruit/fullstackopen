// const Country = ({ country }) => {
const Country = ({ capital, flags, population, area, languages, name }) => {
  // console.log(population);
  // console.log(flags);
  console.log(languages);
  const flag = flags.png;
  const nameC = name.common;
  return (
    <div>
      <h3>{nameC} </h3>
      <p>capital: {capital}</p>
      <p>area: {area}</p>
      <h5>languages:</h5>

      {/* <div>{objectMapPP(languages)}</div> */}
      <img src={flag} alt={nameC}></img>
      {/* <p>{languages}</p> */}
      {/* console.log(languages); */}
      {/* {country.languages.map((lang) => {
                console.log(lang);
                return <li>{lang}</li>;
              })} */}
    </div>
    // );
  );
};

export default Country;

//  {
//    toggle &&(
//      filt.map((country) => {
//        console.log(country);
//        return <p>country.name</p>;
//        // return <Country key={country.name.common} {...country} />;
//      });
// ) }
