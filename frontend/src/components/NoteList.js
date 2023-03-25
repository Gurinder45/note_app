export const NoteList = ({ notes, onNoteClick, onDelete, onEdit }) => {
  return (
    <div className="container" style={{ backgroundColor: "white" }}>
      <h3 style={{ marginBottom: "10px" }}> Saved Notes</h3>
      {notes.length > 0 ? (
        notes.map((note) => (
          <ul key={note.id}>
            <li onClick={() => onNoteClick(note)}>
              {note.title}
            </li>
            <button type="button" className="btn btn-outline-success"onClick={() => onNoteClick(note)}>Full Note</button>
            <button type="button" className="btn btn-outline-primary"onClick={() => onEdit(note)}>Edit</button>
            <button type="button" className="btn btn-outline-danger" onClick={() => onDelete(note)} >Delete</button>
          </ul>
        ))
      ) : (
        <p>There are no notes to display.</p>
      )}
    </div>
  );
};
