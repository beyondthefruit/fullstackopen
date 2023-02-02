const Note = ({ notes }) => {
  return (
    <>
      <ul>
        {notes.map((note) => {
          console.log(notes);
          console.log(note);
          const { id, content } = note;
          return <li key={id}>{content}</li>;
        })}
      </ul>
    </>
  );
};

export default Note;
