import { useEffect, useState } from "react";
import moment from "moment-timezone";

const EditNote = ({note, stopEditing}) => {
  const [title, setTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");

  useEffect(() => {
    setTitle(note.title)
    setNoteBody(note.notebody)
  }, [note]);


  const changeNote = async (event) => {
    event.preventDefault();
    const id = note.id;
    const timestamp = moment().format();
    const response = await fetch(`http://localhost:3000/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        noteBody,
        timestamp,
      }),
    });
    const data = await response.json();
    console.log(data);
    stopEditing();
  };

    
  return (
    <div className="container">
      <h4 style={{ color: "red" }}>Editing {note.title}</h4>
      <form id="edit-form" onSubmit={changeNote}>
        <div id="title-area" className="form-group">
          <label htmlFor="title" style={{ marginBottom: "5px" }}>
            Note Name:
          </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="form-control"
            type="text"
            name="title"
            required
            style={{ width: "100%" }}
          />
        </div>
        <div id="text-area" className="form-group">
          <label htmlFor="noteBody" style={{ marginBottom: "5px" }}>
            Content:
          </label>
          <textarea
            onChange={(e) => setNoteBody(e.target.value)}
            value={noteBody}
            className="form-control"
            name="noteBody"
            id="content"
            cols="50"
            rows="15"
            style={{ resize: "none" }}
            required
          ></textarea>
        </div>
        <button type="submit"> SAVE CHANGES</button>
      </form>
    </div>
  );
};

export default EditNote;
