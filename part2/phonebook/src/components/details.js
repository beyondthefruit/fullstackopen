const Details = ({ persons, phoneList }) => {
  return (
    <>
      {phoneList.map((person) => {
        const { name, number, id } = person;
        return (
          <p key={id}>
            {name} {number}
          </p>
        );
      })}
    </>
  );
};
export default Details;
