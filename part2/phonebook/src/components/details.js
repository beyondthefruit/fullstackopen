const Details = ({ persons }) => {
  return (
    <>
      {persons.map((person) => {
        const { name, id } = person;
        return <p key={id}>{name}</p>;
      })}
    </>
  );
};
export default Details;
