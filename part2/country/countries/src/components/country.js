import Weather from './weather';
const Country = ({
  capital,
  flags,
  area,
  languages,
  name,
  country,
  selector,
}) => {
  console.log(languages);

  const flag = flags.png;
  const nameC = name.common;
  return (
    <div>
      <h3>{nameC} </h3>
      <p>capital: {capital}</p>
      <p>area: {area}</p>

      <h5>languages:</h5>

      {Object.values(languages).map((language, index) => (
        <li key={index}>{language}</li>
      ))}

      <img src={flag} alt={nameC}></img>

      <Weather capital={capital} />
    </div>
  );
};

export default Country;
