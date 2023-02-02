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

  const getNotes = () => {
    return JSON.parse(localStorage.getItem("formData"));
  };

  useEffect(() => {
    setNotes(getNotes());
  }, []);

  const handleSelectNote = (note) => {
    setSelectedNote(note);
    handleShow();
  };

  const handleNoteSubmit = () => {
    setNotes(getNotes());
  };

  return (
    <div className="App">
      <Field onNoteSubmit={handleNoteSubmit} />
      <NoteList notes={notes} onNoteClick={handleSelectNote} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedNote.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{selectedNote.content}</Modal.Body>
      </Modal>
    </div>
  );
}

export default App;
