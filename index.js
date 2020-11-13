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
  console.log("movies");
    const sqlSelect = "SELECT * FROM Movies order by year desc, name asc;";
    db.query(sqlSelect, (err, result) => {
        res.json(result);
    });
});

app.get("/api/getmovie", (req, res) => {
  console.log("one movie");
  let movieid = req.query.id;
  console.log("movieid: " + movieid);
  const sqlSelect = "SELECT * FROM Movies where movieid = ?;";
  db.query(sqlSelect, [movieid], (err, result) => {
      res.json(result);
  });
});


app.post("/api/reviewexists", (req, res) => {
  let movieid = req.body.movieid;
  let userid = req.body.userid;
  const sqlSelect = "SELECT * FROM Review where movieid = ? AND userid = ?;";
  db.query(sqlSelect, [movieid, userid], (err, result) => {
      console.log("what's happening " + result);
      res.json(result);
  });
});

app.get("/api/getusers", (req, res) => {
  const sqlSelect = "SELECT * FROM User;";
  db.query(sqlSelect, (err, result) => {
      res.json(result);
  });
});

app.post('/api/insertfavorite', (req, res) => {
  console.log('here fav');
  console.log(req);
  const userID = req.body.userid;
  const movieid = req.body.movieid;
  const watched = 0;

  const sqlInsert = "INSERT INTO Favorites (userID, movieid, watched) VALUES(?, ?, ?)";
  db.query(sqlInsert, [userID, movieid, watched], (err, result) => {
      console.log('here');
      console.log(result);
      console.log(err);
  });
});

app.post('/api/submitreview', (req, res) => {
  let userid = req.body.userid;
  let rating = req.body.rating;
  let content = req.body.review;
  let movieid = req.body.movieid;
  let date = req.body.date;
  // const sqlInsert = "INSERT INTO Review (userid, movieid, rating, date, content) VALUES(?, ?, ?, ?, ?)";
  // db.query(sqlInsert, [uerid, movieid, rating, date, content], (err, result) => {
  // let date = parseInt(req.body.date);
  const sqlInsert = "INSERT INTO Review (userid, movieid, rating, date, content, report) VALUES(?, ?, ?, curdate(), ?, 0)";
  db.query(sqlInsert, [userid, movieid, rating, content], (err, result) => {
      console.log('here for review');
      console.log(result);
      console.log(err);
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