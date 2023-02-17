import Weather from './weather';
const Country = ({
  capital,
  flags,
  population,
  area,
  languages,
  name,
  country,
}) => {
  console.log(languages);

  const flag = flags.png;
  const nameC = name.common;
  return (
    <div>
      <h3>{nameC} </h3>
      <p>capital: {capital}</p>
      <p>area: {area}</p>
      {/* <p>population: {population}</p> */}
      <h5>languages:</h5>

      {Object.values(languages).map((language, index) => (
        <li key={index}>{language}</li>
      ))}

      <img src={flag} alt={nameC}></img>

      <Weather capital={capital} country={country} />
    </div>
  );
};

export default Country;
