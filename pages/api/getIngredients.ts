// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const dbconfig = require('../../dbconfig')
const mysql = require('mysql2');
const { createPool } = mysql;

const pool = createPool({
  host: dbconfig.host,
  user: dbconfig.user,
  password: dbconfig.password,
  database: dbconfig.database
})

export default async function handler(req, res) {
  try {
    const [rows] = await pool.promise().query('SELECT * FROM ingredienser');
    res.status(200).json({ rows });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

