import { useState, useEffect } from 'react';
import axios from 'axios';
import Details from './components/details';
import Filter from './components/filter';
import PersonForm from './components/form';
import phoneService from './services/phones';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('name');
  const [newPhone, setNewPhone] = useState('phone');
  const [filteredList, setFilteredList] = useState('');
  // const [filt, setFilt] = useState(true);

  const hook = () => {
    //first method
    // phoneService.getAll().then((response) => {
    //   setPersons(response.data);
    // });
    //second method after returning the request inside the service
    phoneService.getAll().then((initialPhone) => {
      setPersons(initialPhone);
    });
  };

  useEffect(hook, []);

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
      phoneService.create(adObject).then((returnedPhone) => {
        setPersons(persons.concat(returnedPhone));
        setNewName('');
        setNewPhone('');
      });
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

  const deletePhoneUser = (id, personName) => {
    const user = persons.find((person) => person.id === id);
    const windowDelete = window.confirm(
      `Are you sure you want to delete ${personName}`
    );
    if (windowDelete) {
      phoneService.deletePhone(id).then(() => {
        const filterPerson = persons.filter((person) => person.id !== id);
        //means we filter person with different id
        setPersons(filterPerson);
      });
    }
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

      <Details
        persons={persons}
        phoneList={phoneList}
        deletePhoneUser={deletePhoneUser}
      />
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