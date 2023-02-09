const PersonForm = ({
  addPhone,
  newName,
  handleChangeName,
  newPhone,
  handleChangePhone,
}) => {
  return (
    <>
      <div>
        <form onSubmit={addPhone}>
          name: <input value={newName} onChange={handleChangeName} />
          <div>
            number: <input value={newPhone} onChange={handleChangePhone} />
          </div>
          <button type='submit'>add me</button>
        </form>
      </div>
    </>
  );
};
export default PersonForm;
