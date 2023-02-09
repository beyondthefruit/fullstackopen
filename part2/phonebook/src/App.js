import { useState } from 'react';
import Details from './components/details';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('name');
  // const [double, setDouble] = useState(false);
  // console.log(double);
  // const [phoneBook, setPhoneBook] = useState(persons);

  let hi = persons.map((person) => person.name);
  let doubleName = false;

  // check if a name is already on the list
  const checkDoubleName = () => {
    if (hi.includes(newName)) {
      doubleName = true;
    } else {
      doubleName = false;
    }
  };

  //form mgt
  const addPhone = (e) => {
    e.preventDefault(); // necessary to avoid reloading the page
    // console.log('button clicked', event.target);

    const adObject = {
      name: newName,
      id: persons.length + 1,
    };

    checkDoubleName();
    if (doubleName === true) {
      alert(`${newName} is already added to phonebook`);
      setNewName('');
    } else {
      setPersons(persons.concat(adObject));
      setNewName('');
    }
  };
  const handleChange = (e) => {
    setNewName(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        <form onSubmit={addPhone}>
          name: <input value={newName} onChange={handleChange} />
          <button type='submit'>add me</button>
        </form>
      </div>
      <Details persons={persons} />
      <div>
        {/* <form onSubmit={addPhone}>
            <input value={newName} onChange={handleChange} />
          </form>
          <button type='submit'>add me</button> */}
      </div>
      {/* </form> */}
      <h2>Numbers</h2>
      <div> {newName}</div>
    </div>
  );
};

export default App;
