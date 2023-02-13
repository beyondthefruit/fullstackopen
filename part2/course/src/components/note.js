const Note = ({ notesToShow, toggleImportanceOf }) => {
  // const label = (e) => e.important ? 'make not important' : 'make important';
  return (
    <>
      <ul>
        {notesToShow.map((note) => {
          console.log(note);
          const { id, content, important } = note;
          const label = important ? 'make not important' : 'make important';
          return (
            <li key={id}>
              {content}
              <button onClick={() => toggleImportanceOf(id)}>{label}</button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Note;
