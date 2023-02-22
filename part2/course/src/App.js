import Note from './components/note';
import noteService from './services/notes';
import notesData from './data';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import Notification from './components/notif';
import Footer from './components/footer';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a new note..');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  // console.log(newNote);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);
  // console.log('render', notes.length, 'notes');

  //form mgt au secours
  const addNote = (event) => {
    event.preventDefault(); // necessary to avoid reloading the page
    // console.log('button clicked', event.target);

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };
    // send to server method
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
  return (
    <div>
      <h1>Notes</h1>
      <Notification errorMessage={errorMessage} />
      <Note toggleImportanceOf={toggleImportanceOf} notesToShow={notesToShow} />
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type='submit'>save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;
