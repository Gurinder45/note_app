import { useState, useEffect } from "react";

const Field = (props) => {
  const [formData, setFormData] = useState([]);
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("formData")) || [];
    setFormData(storedData);
  }, []);

  const handleChange = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  const submitNote = (event) => {
    event.preventDefault();
    setFormData([...formData, { ...inputs, id: Date.now() }]);
    localStorage.setItem(
      "formData",
      JSON.stringify([...formData, { ...inputs, id: Date.now() }])
    );
    setInputs({
      title: "",
      content: "",
    });
    props.onNoteSubmit();
  };

  return (
    <div id="add-container">
      <form id="add-form" onSubmit={submitNote}>
        <div id="title-area" className="form-group">
          <label htmlFor="title" style={{ marginBottom: "5px" }}>
            Title:
          </label>
          <input
            onChange={handleChange}
            value={inputs.title}
            className="form-control"
            type="text"
            name="title"
            required
            style={{ width: "100%" }}
          />
        </div>
        <div id="text-area" className="form-group">
          <label htmlFor="content" style={{ marginBottom: "5px" }}>
            Content:
          </label>
          <textarea
            onChange={handleChange}
            value={inputs.content}
            className="form-control"
            name="content"
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
