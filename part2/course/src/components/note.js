const Note = ({ notes, notesToShow }) => {
  return (
    <>
      <ul>
        {notesToShow.map((note) => {
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
