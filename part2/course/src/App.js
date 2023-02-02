import Note from './components/note';
import notesData from './data';
import { useState } from 'react';
const App = () => {
  const [notes, setNotes] = useState(notesData);
  const [newNote, setNewNote] = useState('a new note..');
  const [showAll, setShowAll] = useState(true);
  // console.log(newNote);

  //form mgt
  const addNote = (event) => {
    event.preventDefault(); // necessary to avoid reloading the page
    // console.log('button clicked', event.target);

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };

    setNotes(notes.concat(noteObject)); // method does not mutate the original notes array, but rather creates a new copy of the array with the new item added to the end
    setNewNote(''); // reset value of controlled input element
  };
  const handleNoteChange = (event) => {
    // console.log(event.target.value);
    setNewNote(event.target.value);
  };

  //display notes
  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);
  return (
    <div>
      <h1>Notes</h1>
      <Note notes={notes} notesToShow={notesToShow} />
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
