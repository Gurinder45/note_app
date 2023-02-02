export const NoteList = ({ notes, onNoteClick }) => {
  return (
    <div style={{ backgroundColor: "white" }}>
      {notes ? (
        notes.map((note) => (
          <h4 key={note.id} onClick={() => onNoteClick(note)}>
            {note.title}
          </h4>
        ))
      ) : (
        <p>There are no notes to display.</p>
      )}
    </div>
  );
};
