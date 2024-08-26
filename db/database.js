const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the MySQL database:', err.message);
    return;
  }
  console.log('Connected to the MySQL database.');

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS recipes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      ingredients TEXT NOT NULL,
      instructions TEXT NOT NULL,
      image VARCHAR(255),
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  connection.query(createTableQuery, (err, results) => {
    if (err) {
      console.error('Error creating recipes table:', err.message);
    } else {
      console.log('Recipes table is ready.');
    }
  });
});

module.exports = connection;
