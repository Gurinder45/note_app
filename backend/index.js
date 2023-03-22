const express = require("express");
const app = express();
const { Pool } = require("pg");
const cors = require("cors");

const pool = new Pool({
  user: "postgres",
  password: "root",
  host: "localhost",
  port: 5432,
});

app.use(express.json());
app.use(cors());

app.get("/notes", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM notes ORDER BY timelastmodified DESC"
    );
    // console.log(rows);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/add", async (req, res) => {
  const { title, noteBody, timestamp } = req.body;
  try {
    const { title, noteBody, timestamp } = req.body;
    const { rows } = await pool.query(
      "INSERT INTO notes (title, notebody, timelastmodified) VALUES ($1, $2, $3) RETURNING *",
      [title, noteBody, timestamp]
    );
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "DELETE FROM notes WHERE id = $1 RETURNING *",
      [req.params.id]
    );
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const { title, noteBody, timestamp } = req.body;

  try {
    const { rows } = await pool.query(
      "UPDATE notes SET title = $1, notebody = $2, timelastmodified = $3 WHERE id = $4 RETURNING *",
      [title, noteBody, timestamp, id]
    );

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(8080, function () {
  console.log(`app running on port 8080`);
});
