const List = ({ toggle, setToggle, handleClick, name, country }) => {
  console.log(toggle);
  return (
    <li key={name.common}>
      {name.common}
      <button
        onClick={() => {
          handleClick(country);
          setToggle(!toggle);
        }}
      >
        {!toggle ? 'view country' : 'close preview'}
      </button>
    </li>
  );
};

export default List;
