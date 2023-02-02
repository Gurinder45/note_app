import { useState, useEffect } from "react";
import Field from "./components/Field";
import { NoteList } from "./components/NoteList";
import NoteView from "./components/NoteView";

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState({});

  const getNotes = () => {
    return JSON.parse(localStorage.getItem("formData"));
  };

  useEffect(() => {
    setNotes(getNotes());
  }, []);

  const handleSelectNote = (note) => {
    setSelectedNote(note);
  };

  const handleNoteSubmit = () => {
    setNotes(getNotes());
  };

  return (
    <div className="App">
      <Field onNoteSubmit={handleNoteSubmit} />
      <NoteList notes={notes} onNoteClick={handleSelectNote} />
      {selectedNote && <NoteView note={selectedNote} />}
    </div>
  );
}

export default App;
