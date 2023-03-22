import { useState, useEffect } from "react";
import Field from "./components/Field";
import { NoteList } from "./components/NoteList";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getNotes = async () => {
    const response = await fetch("http://localhost:8080/notes");
    const notes = await response.json();
    setNotes(Array.isArray(notes) ? notes : []);
  };

  useEffect(() => {
    getNotes();
  }, []);

  const handleSelectNote = (note) => {
    setSelectedNote(note);
    handleShow();
  };

  const handleNoteSubmit = () => {
    getNotes();
  };


  const formattedTime = new Date(selectedNote.timelastmodified).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return (
    <div className="App">
      <Field onNoteSubmit={handleNoteSubmit} />
      <NoteList notes={notes} onNoteClick={handleSelectNote} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>{selectedNote.title}</h3>
            <p>Last modified {formattedTime}</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedNote.notebody}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default App;
