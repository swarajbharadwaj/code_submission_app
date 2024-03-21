const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  // You can also use '*' to allow requests from any origin, but it's less secure
  // res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  // Set to true if you need to include cookies in the request
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
const port = process.env.PORT || 5000;

const db = mysql.createConnection({
  host: process.env.DB_host,
  user: process.env.DB_user,
  password: process.env.DB_password,
  database:process.env.DB_database,
});


db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

app.use(bodyParser.json());

app.post('/submit', (req, res) => {
  const { username, codeLanguage, stdin, sourceCode, out } = req.body;

  const sql = 'INSERT INTO code_snippets (username, code_language, stdin, source_code, out_t) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [username, codeLanguage, stdin, sourceCode,out], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to submit code snippet' });
      throw err;
    }
    res.status(201).json({ message: 'Code snippet submitted successfully' });
  });
});

app.get('/snippets', (req, res) => {
  const sql = 'SELECT username, code_language, stdin, LEFT(source_code, 100) AS source_code_short, out_t, timestamp FROM code_snippets';
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to retrieve code snippets' });
      throw err;
    }
    res.status(200).json(result);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
