export const NoteList = ({ notes, onNoteClick }) => {
  return (

     <div className="container" style={{ backgroundColor: "white" }}>
     <h3 style={{marginBottom: "10px"}}> Saved Notes</h3>
    {notes ? (
        notes.map((note) => (
        <ul>
          <li key={note.id} onClick={() => onNoteClick(note)}>
            {note.title}
          </li>
        </ul>
        ))
      ) : (
        <p>There are no notes to display.</p>
      )}
    </div>
   
  );
};
