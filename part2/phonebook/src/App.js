import { useState } from 'react';
import Details from './components/details';
import Filter from './components/filter';
import PersonForm from './components/form';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '0401-235-426', id: 1 },
    { name: 'Ada Lovelace', number: '3944-533-523', id: 2 },
    { name: 'Dan Abramov', number: '1243-223-435', id: 3 },
    { name: 'Mary Poppendieck', number: '3923-642-122', id: 4 },
  ]);
  const [newName, setNewName] = useState('name');
  const [newPhone, setNewPhone] = useState('phone');
  const [filteredList, setFilteredList] = useState('');
  // const [filt, setFilt] = useState(true);

  let checkName = persons.map((person) => person.name);
  let doubleName = false;

  // check if a name is already on the list
  const checkDoubleName = () => {
    if (checkName.includes(newName)) {
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
      number: newPhone,
      id: persons.length + 1,
    };

    checkDoubleName();
    if (doubleName === true) {
      alert(`${newName} is already added to phonebook`);
      setNewName('');
      //if doubleName is true we display alert and empty the form field
    } else {
      //else we proceed with concat the persons array
      setPersons(persons.concat(adObject));
      setNewName('');
      setNewPhone('');
    }
  };
  const handleChangeName = (e) => {
    setNewName(e.target.value);
  };
  const handleChangePhone = (e) => {
    setNewPhone(e.target.value);
  };
  const filterPerson = (e) => {
    e.preventDefault();
  };

  const handleFilter = (e) => {
    setFilteredList(e.target.value);
  };

  const phoneList = persons.filter((person) => {
    return person.name.toLowerCase().includes(filteredList.toLowerCase());
    // better method is to use localeCompare()
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filterPerson={filterPerson}
        filteredList={filteredList}
        handleFilter={handleFilter}
      />

      <Details persons={persons} phoneList={phoneList} />
      <div>
        <PersonForm
          addPhone={addPhone}
          newName={newName}
          handleChangeName={handleChangeName}
          newPhone={newPhone}
          handleChangePhone={handleChangePhone}
        />
      </div>
      <h2>Numbers</h2>
      <div> {newName}</div>
    </div>
  );
};

export default App;
