import { useState, useEffect } from "react";
import moment from "moment-timezone";

const Field = (props) => {
  const [title, setTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");

  const submitNote = async (event) => {
    event.preventDefault();
    const timestamp = moment().format();
    const response = await fetch("http://localhost:8080/add/", {
      method: "POST",
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
  };

  return (
    <div className="container">
      <h3>Add Form</h3>
      <form id="add-form" onSubmit={submitNote}>
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
        <button type="submit"> SAVE NOTE</button>
      </form>
    </div>
  );
};

export default Field;
