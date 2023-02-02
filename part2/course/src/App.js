import Note from './components/note';
import notes from './data';
const App = () => {
  return (
    <div>
      <h1>Notes</h1>
      <Note notes={notes} />
    </div>
  );
};

export default App;
