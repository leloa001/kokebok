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

const insertQuery= 'INSERT INTO oppskrifter(rettNavn, ingredienser, ingredienserMedMengde, tid, bilde, fremgangsmåte) values(?)'

const rettNavn = req.body.data.rettNavn
const ingredienser = req.body.data.ingredienser
const ingredienserMedMengde = req.body.data.ingredienserMedMengde
const tid = req.body.data.tid
const bilde = req.body.data.bilde
const fremgangsmåte = req.body.data.fremgangsmåte

const recipe = [rettNavn, ingredienser, ingredienserMedMengde, tid, bilde, fremgangsmåte]
console.log(recipe)

connection.query(insertQuery, [recipe], (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ error: 'Error inserting data' });
      return;
    }
    res.status(200).json({ message: req.body.data.rettNavn + ' ble lagt til i databasen' });
  });




}