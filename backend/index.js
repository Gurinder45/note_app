const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "root",
  host: "localhost",
  port: 5432,
});

pool.query(
  `
  CREATE TABLE IF NOT EXISTS notes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    noteBody TEXT,
    timeLastModified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`,
  (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Table created successfully");
    }
    pool.end();
  }
);
