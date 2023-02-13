const Details = ({ persons, phoneList, deletePhoneUser }) => {
  return (
    <>
      {phoneList.map((person) => {
        const { name, number, id } = person;
        return (
          <div className='list' key={id}>
            {name} {number}
            <button onClick={() => deletePhoneUser(id, name)}>delete</button>
          </div>
        );
      })}
    </>
  );
};
export default Details;
