const mysql = require('mysql2');
const dbconfig = require('../../dbconfig')

export default function handler(req, res) {
// Create a database connection
const connection = mysql.createConnection({
  host: dbconfig.host,
  user: dbconfig.user,
  password: dbconfig.password,
  database: dbconfig.database
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

const insertQuery= 'INSERT INTO ingredienser(ingrediensNavn) values(?)'

req.body.data.map(ingredient => {
  connection.query(insertQuery, [ingredient], (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ error: 'Error inserting data' });
      return;
    }
    res.status(200).json({ message: req.body.data + ' ble lagt til i databasen' });
  });
})



}