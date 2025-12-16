const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

// 1. Connect to a new database file (it will be created if it doesn't exist)
const db = new sqlite3.Database('./cars.db', (err) => {
  if (err) {
    console.error("Error opening database " + err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// 2. Read the schema.sql file
const schema = fs.readFileSync('./schema.sql').toString();

// 3. Run the SQL code to create tables
db.exec(schema, (err) => {
    if (err) {
        console.error("Error creating tables: " + err.message);
    } else {
        console.log("Tables created successfully!");
    }
});

// 4. Close the connection
db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});