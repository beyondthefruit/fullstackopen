import Note from './components/note';
import noteService from './services/notes';
// import notesData from './data';
import { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
import './index.css';
import Notification from './components/notif';
import Footer from './components/footer';
import loginService from './services/login';
import Login from './components/login';
import NoteForm from './components/noteForm';
import Togglable from './components/togglable';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [, setNewNote] = useState('a new note..');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  // console.log(newNote);
  const noteFormRef = useRef();
  // const [loginVisible, setLoginVisible] = useState(false);
  // console.log(newNote);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);
  // console.log('render', notes.length, 'notes');

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  //form mgt au secours
  const addNote = (noteObject) => {
    // event.preventDefault(); // necessary to avoid reloading the page
    // console.log('button clicked', event.target);

    // const noteObject = {
    //   content: newNote,
    //   important: Math.random() < 0.5,
    // };
    // send to server method
    // form ref Help with hiding the form after creation
    noteFormRef.current.toggleVisibility();
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote('');
    });
  };

  const handleNoteChange = (event) => {
    // console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  //display notes
  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  // const handleLogin = (event) => {
  //   event.preventDefault();
  //   console.log('logging in with', username, password);
  // };

  //method for handling login
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      noteService.setToken(user.token);
      //save info to local storage
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));

      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  //Problems come from my login component
  // const loginForm = () => (
  //   <form onSubmit={handleLogin}>
  //     <div>
  //       username
  //       <input
  //         type='text'
  //         value={username}
  //         name='Username'
  //         onChange={({ target }) => setUsername(target.value)}
  //       />
  //     </div>
  //     <div>
  //       password
  //       <input
  //         type='password'
  //         value={password}
  //         name='Password'
  //         onChange={({ target }) => setPassword(target.value)}
  //       />
  //     </div>
  //     <button type='submit'>login</button>
  //   </form>
  // );

  // const noteForm = () => (
  //   <form onSubmit={addNote}>
  //     <input value={newNote} onChange={handleNoteChange} />
  //     <button type='submit'>save</button>
  //   </form>
  // );
  const loginOut = () => {
    window.localStorage.removeItem('loggedNoteappUser');
    setUser(null);
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification errorMessage={errorMessage} />
      {/* {loginForm()} */}
      {/* {!user && loginForm()} */}
      {/* <button onClick={() => setLoginVisible(!loginVisible)}>log in</button>
      {loginVisible && (
        <Login
          hangleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      )} */}
      {!user && (
        <Togglable buttonLabel='log in'>
          <Login
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      )}
      {user && <div>Hiiiiiii</div>}
      {user && (
        <>
          <div>
            <p>{user.name} logged in</p>
            {/* {noteForm()} */}
            {/* <NoteForm /> */}
            <Togglable buttonLabel='new note' ref={noteFormRef}>
              <NoteForm
                // onSubmit={addNote}
                // value={newNote}
                handleChange={handleNoteChange}
                createNote={addNote}
              />
            </Togglable>
          </div>
          <button type='submit' onClick={loginOut}>
            logout
          </button>
        </>
      )}

      <div>
        <Note
          toggleImportanceOf={toggleImportanceOf}
          notesToShow={notesToShow}
        />
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>

      {/*
      <Note toggleImportanceOf={toggleImportanceOf} notesToShow={notesToShow} />
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type='submit'>save</button>
      </form> */}
      <Footer />
    </div>
  );
};

export default App;
