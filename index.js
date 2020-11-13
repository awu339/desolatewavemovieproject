const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const generatePassword = require('password-generator');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

const db = mysql.createConnection({
    host: 'vcm-17529.vm.duke.edu',
    user: 'root',
    password: 'password',
    database: 'mydb'
});

db.connect();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/getmovies", (req, res) => {
    const sqlSelect = "SELECT * FROM Movies order by year desc, name asc;";
    db.query(sqlSelect, (err, result) => {
        res.json(result);
    });
});

app.get("/api/getmovie", (req, res) => {
  let movieid = req.query.id;
  const sqlSelect = "SELECT * FROM Movies where movieid = ?;";
  db.query(sqlSelect, [movieid], (err, result) => {
      res.json(result);
  });
});

// Put all API endpoints under '/api'
app.get('/api/passwords', (req, res) => {
  const count = 5;

  // Generate some passwords
  const passwords = Array.from(Array(count).keys()).map(i =>
    generatePassword(12, false)
  )

  // Return them as json
  res.json(passwords);

  console.log(`Sent ${count} passwords`);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);