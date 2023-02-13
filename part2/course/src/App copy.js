// import Note from './components/note';
// import noteService from './services/notes';
// import notesData from './data';
// import { useState, useEffect } from 'react';
// import axios from 'axios';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a new note..');
  const [showAll, setShowAll] = useState(true);
  // console.log(newNote);

  useEffect(() => {
    console.log('effect');
    axios.get('http://localhost:3001/notes').then((response) => {
      console.log('promise fulfilled');
      setNotes(response.data);
    });
  }, []);
  console.log('render', notes.length, 'notes');

  // or
  // const hook = () => {
  //   console.log('effect');
  //   axios.get('http://localhost:3001/notes').then((response) => {
  //     console.log('promise fulfilled');
  //     setNotes(response.data);
  //   });
  // };

  // useEffect(hook, []);

  //form mgt
  const addNote = (event) => {
    event.preventDefault(); // necessary to avoid reloading the page
    // console.log('button clicked', event.target);

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };
    // send to server method
    axios.post('http://localhost:3001/notes', noteObject).then((response) => {
      console.log(response);
      setNotes(notes.concat(response.data));
      setNewNote('');
    });

    // first method
    // setNotes(notes.concat(noteObject)); // method does not mutate the original notes array, but rather creates a new copy of the array with the new item added to the end
    // setNewNote(''); // reset value of controlled input element
  };
  const handleNoteChange = (event) => {
    // console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const toggleImportanceOf = (id) => {
    console.log(`importance of ${id} needs to be toggled`);
    const url = `http://localhost:3001/notes/${id}`;
    // uniaue url for each  notes
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    axios.put(url, changedNote).then((response) => {
      setNotes(notes.map((n) => (n.id !== id ? n : response.data)));
    });
  };

  //display notes
  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);
  return (
    <div>
      <h1>Notes</h1>
      <Note toggleImportanceOf={toggleImportanceOf} notesToShow={notesToShow} />
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type='submit'>save</button>
      </form>
    </div>
  );
};

export default App;
