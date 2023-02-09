const Filter = ({ filteredList, filterPerson, handleFilter }) => {
  return (
    <>
      <form onSubmit={filterPerson}>
        filter shown with:{' '}
        <input value={filteredList} onChange={handleFilter} />
      </form>
    </>
  );
};

export default Filter;
