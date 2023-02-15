const Search = ({ filterCountry, handleFilter, filteredList }) => {
  return (
    <>
      <form on onSubmit={filterCountry}>
        find countries
        <input value={filteredList} onChange={handleFilter} />
      </form>
    </>
  );
};

export default Search;
