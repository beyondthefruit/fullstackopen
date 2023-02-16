import { useState } from 'react';
const List = ({ toggle, setToggle, handleClick, name, country }) => {
  const [view, setView] = useState(true);
  // view is use to change the btn text
  //toggle is use to toggle the country component onClick

  return (
    <li key={name.common}>
      {name.common}
      <button
        onClick={() => {
          handleClick(country);
          setToggle(!toggle);
          setView(!view);
        }}
      >
        {view ? 'view country' : 'close preview'}
      </button>
    </li>
  );
};

export default List;
