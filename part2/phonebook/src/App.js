import { useState, useEffect } from 'react';
import axios from 'axios';
import Details from './components/details';
import Filter from './components/filter';
import PersonForm from './components/form';
import phoneService from './services/phones';
import './index.css';
import Notification from './components/notif';
import Error from './components/error';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('name');
  const [newPhone, setNewPhone] = useState('phone');
  const [filteredList, setFilteredList] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const hook = () => {
    phoneService.getAll().then((initialPhone) => {
      setPersons(initialPhone);
    });
  };

  useEffect(hook, []);

  //form management lili
  const addPhone = (e) => {
    e.preventDefault(); // necessary to avoid reloading the page
    // console.log('button clicked', event.target);

    const adObject = {
      name: newName,
      number: newPhone,
      id: persons.length + 1,
    };

    let checkName = persons.find((person) => person.name === newName);
    console.log(checkName);

    if (checkName) {
      const windowUpdate = window.confirm(
        `Are you sure you want to update ${newName}'phone number?`
      );
      if (windowUpdate) {
        let checkNameId = checkName.id;
        const user = persons.find((person) => person.id === checkNameId);
        const changedPhoneNumber = { ...user, number: newPhone };
        phoneService
          .update(checkNameId, changedPhoneNumber)
          .then((returnedPhone) => {
            setPersons(
              persons.map((person) =>
                person.id !== checkNameId ? person : returnedPhone
              )
            );
            setNewName('');
            setSuccessMessage(
              `${newName}'s phone number was successfully updated`
            );

            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setErrorMessage(`${newName} has already been removed from server`);
            console.log('this is my catch parameter', error);

            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
            setPersons(persons.filter((p) => p.id !== checkNameId));
            console.log('this is my catch parameter', error);
          });
      }
    } else {
      //else we proceed with concat the persons array
      phoneService.create(adObject).then((returnedPhone) => {
        setPersons(persons.concat(returnedPhone));
        setNewName('');
        setNewPhone('');
        setSuccessMessage(`${newName} was successfully added`);

        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      });
    }
    setNewName('');
    setNewPhone('');
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
      <Notification successMessage={successMessage} />
      <Error errorMessage={errorMessage} />
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
    </div>
  );
};

export default App;
