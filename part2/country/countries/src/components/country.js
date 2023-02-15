const Country = ({ countryFilt }) => {
  return (
    <>
      {countryFilt.map((country, index) => {
        const { name, capital, flag, population } = country;

        return <div key={index}>{capital}</div>;
      })}
    </>
  );
};

export default Country;
