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


app.post("/api/reviewexists", (req, res) => {
  let movieid = req.body.movieid;
  let userid = req.body.userid;
  const sqlSelect = "SELECT * FROM Review where movieid = ? AND userid = ?;";
  db.query(sqlSelect, [movieid, userid], (err, result) => {
      res.json(result);
  });
});

app.get("/api/getusers", (req, res) => {
  const sqlSelect = "SELECT * FROM User;";
  db.query(sqlSelect, (err, result) => {
      res.json(result);
  });
});

app.get('/api/checkuser', (req, res) =>{
  var usernameval = req.query.id;
  const sqlCheckUser = "SELECT password FROM User WHERE username = ?";
  db.query(sqlCheckUser, [usernameval], (err, result) =>{
      if(err) console.log(err);
      res.json(result);
  });
});

app.get("/api/getfavorites", (req, res) => {
  let userid = req.query.id;
  const sqlSelect = "SELECT m.name as name, m.year as year, m.plot as plot, f.movieid as movieid, f.watched as watched FROM Movies as m, Favorites as f WHERE f.userid = ? and f.movieid = m.movieid order by m.name asc;";
  db.query(sqlSelect, [userid], (err, result) => {
      res.json(result);
  });
});

app.get('/api/getuserid', (req, res) =>{
  var usernameval = req.query.id;
  const sqlSelect = "SELECT userid, type FROM User WHERE username = ?";
  db.query(sqlSelect, [usernameval], (err, result) =>{
      if(err) console.log(err);
      res.json(result);
  });
});

app.get('/api/delete', (req, res) => {
  var movieidval = req.query.id;
  var userid = req.query.userid;
  const sqlDelete = "DELETE FROM Favorites WHERE movieid = ? and userid = ?";
  db.query(sqlDelete, [movieidval, userid],  (err, result) => {
      if (err) console.log(err);
  });
});

app.get('/api/unfriend', (req, res) => {
  var user1 = req.query.id;
  var user2 = req.query.userid;
  const sqlDelete = "DELETE FROM Friend WHERE user1 = ? and user2 = ?";
  db.query(sqlDelete, [user1, user2],  (err, result) => {
      if (err) console.log(err);
  });
});

app.get('/api/addfriend', (req, res) => {

  const user1 = req.query.id;
  const user2 = req.query.userid;

  const sqlInsert = "INSERT INTO Friend (user1, user2) VALUES(?, ?)";
    db.query(sqlInsert, [user1, user2],  (err, result) => {
        if (err) console.log(err);
    });
});
app.get("/api/getfriendreviewslimit", (req, res) => {
  let userid = req.query.id;
  const sqlSelect = "SELECT r.reviewid, r.userid, r.rating, r.date, r.content, m.name, m.movieid FROM Review r, Movies m WHERE r.userid = ? AND r.movieid = m.movieid order by r.rating desc, r.date desc limit 10;";
  db.query(sqlSelect, [userid], (err, result) => {
      res.json(result);
  });
});

app.get("/api/friendexists", (req, res) => {
  let user1 = req.query.id;
  let user2 = req.query.userid;
  const sqlSelect = "SELECT * FROM Friend where user1 = ? AND user2 = ?;";
  db.query(sqlSelect, [user1, user2], (err, result) => {
      console.log("can i see this");
      console.log(result);
      res.json(result);
  });
});

app.get("/api/getprofile", (req, res) => {
  let userid = req.query.id;
  const sqlSelect = "SELECT userid, username, type, date_created FROM User WHERE userid = ?;";
  db.query(sqlSelect, [userid], (err, result) => {
      res.json(result);
  });
});

app.get('/api/watched', (req, res) =>{
  var movieidval = req.query.id;
  var userid = req.query.userid;
  const sqlWatched = "UPDATE Favorites SET watched = 1 WHERE movieid = ? and userid = ?";
  db.query(sqlWatched, [movieidval, userid], (err, result) =>{
      if(err) console.log(err);
  });
});


app.get("/api/getfriends", (req, res) => {
  let userid = req.query.id;
  const sqlSelect = "SELECT u.username, u.userid FROM Friend f, User u WHERE f.user1 = ? and f.user2 = u.userid;";
  db.query(sqlSelect, [userid], (err, result) => {
      res.json(result);
  });
});

app.get("/api/getfriendfav", (req, res) => {
  let userid = req.query.id;
  const sqlSelect = "SELECT m.name as name, m.year as year, m.plot as plot, f.movieid as movieid, f.watched as watched FROM Movies as m, Favorites as f WHERE f.userid = ? and f.movieid = m.movieid;";
  db.query(sqlSelect, [userid], (err, result) => {
      res.json(result);
  });
});

app.post('/api/insertfriendfavorite', (req, res) => {

  const movieid = req.body.movieid;
  const userID = req.body.userid;
  const watched = 0;

  const sqlInsert = "INSERT INTO Favorites (userID, movieid, watched) VALUES(?, ?, ?)";
  db.query(sqlInsert, [userID, movieid, watched], (err, result) => {
  });
});

app.post('/api/insertfavorite', (req, res) => {

  const userID = req.body.userid;
  const movieid = req.body.movieid;
  const watched = 0;

  const sqlInsert = "INSERT INTO Favorites (userID, movieid, watched) VALUES(?, ?, ?)";
  db.query(sqlInsert, [userID, movieid, watched], (err, result) => {
  });
});

app.post('/api/submitreview', (req, res) => {
  let userid = req.body.userid;
  let rating = req.body.rating;
  let content = req.body.review;
  let movieid = req.body.movieid;
  let date = req.body.date;
  const sqlInsert = "INSERT INTO Review (userid, movieid, rating, date, content, report) VALUES(?, ?, ?, curdate(), ?, 0)";
  db.query(sqlInsert, [userid, movieid, rating, content], (err, result) => {
      console.log(err);
  });
});

app.post('/api/updatereview', (req, res) => {
  let userid = req.body.userid;
  let rating = req.body.rating;
  let content = req.body.review;
  let movieid = req.body.movieid;
  let date = req.body.date;
  let sql = "DELETE FROM Review WHERE userid = ?;";
  let sql2 = "INSERT INTO Review (userid, movieid, rating, date, content, report) VALUES(?, ?, ?, curdate(), ?, 0);";
  db.query(sql, [userid], (err, result) => {
      //res.send(result);
  })
  db.query(sql2,[userid, movieid, rating, content], (err, result) => {
      res.json(result);
  })
});



app.post("/api/reviewexists", (req, res) => {
  let movieid = req.body.movieid;
  let userid = req.body.userid;
  const sqlSelect = "SELECT * FROM Review where movieid = ? AND userid = ?;";
  db.query(sqlSelect, [movieid, userid], (err, result) => {
      res.json(result);
  });
});

app.get('/api/report', (req, res) => {
  let reviewid = req.query.id;
  const sqlUpdate = "UPDATE Review SET report = report + 1 WHERE reviewid = ?";
  db.query(sqlUpdate, [reviewid], (err, result) => {
  });
});

app.get('/api/dismiss', (req, res) => {
  let reviewid = req.query.id;
  const sqlUpdate = "UPDATE Review SET report = 0 WHERE reviewid = ?";
  db.query(sqlUpdate, [reviewid], (err, result) => {
  });
});

app.get("/api/getreviews", (req, res) => {
  let movieid = req.query.id;
  const sqlSelect = "SELECT * FROM Review r, User u where movieid = ? AND r.userid = u.userid order by r.date desc;";
  db.query(sqlSelect, [movieid], (err, result) => {
      res.json(result);
  });
});

app.get("/api/gettopmovies", (req, res) => {
  let sql = "CREATE VIEW a AS (SELECT movieid, AVG(rating) as rating FROM Review GROUP BY movieid);";
  let sql2 = "SELECT m.name, a.rating, m.movieid, m.poster FROM Movies m, a WHERE m.movieid = a.movieid ORDER BY a.rating desc;"
  db.query(sql, (err, result) => {
      //res.send(result);

  })
  db.query(sql2, (err, result) => {
      res.json(result);

  })
});

app.get("/api/getrecentmovies", (req, res) => {
  let sql = "SELECT * FROM Movies WHERE year = 2019 or year = 2020 order by year desc;"
  db.query(sql, (err, result) => {
      res.json(result);
  })
});

app.get('/api/deletereview', (req, res) => {
  var reviewid = req.query.id;
  const sqlDelete = "DELETE FROM Review WHERE reviewid = ?";
  db.query(sqlDelete, [reviewid],  (err, result) => {
      if (err) console.log(err);
  });
});


app.post('/api/insert', (req, res) => {
  const username = req.body.username;
  const pwd = req.body.pwd;
  const type = req.body.type;
  let sql = "SELECT * FROM User;"
  const sqlInsert = "INSERT INTO User (username, password, type, date_created) VALUES(?, ?, ?, curdate());";
  db.query(sql, (err, result) => {

  });
  db.query(sqlInsert, [username, pwd, type], (err, result) => {

  });
});

app.get("/api/getsearchtitle", (req, res) => {
  let title = '%' + req.query.title + '%';
  let sql = "SELECT * FROM Movies WHERE name LIKE ? order by year desc;";
  db.query(sql, [title], (err, result) => {
      res.json(result);

  })
});

app.get("/api/getsearchyear", (req, res) => {
  let year = req.query.year;
  let sql = "SELECT * FROM Movies WHERE year = ?;";
  db.query(sql, [year], (err, result) => {
      res.json(result);
  })
});

app.get("/api/getsearchuser", (req, res) => {
  let username = '%' + req.query.username + '%';
  let sql = "SELECT * FROM User WHERE username LIKE ?;";
  db.query(sql, [username], (err, result) => {
      res.json(result);
  })
});

app.get("/api/getsearchgenre", (req, res) => {
  let genre = '%' + req.query.genre + '%';
  let sql = "SELECT * FROM Movies WHERE genre LIKE ? order by year desc;";
  db.query(sql, [genre], (err, result) => {
      res.json(result);

  })
});

app.get('/api/allreports', (req, res) => {
  console.log("all reports");
  const sqlSelect = "SELECT * FROM Review r, Movies m, User u WHERE r.report > 0 and r.movieid = m.movieid and r.userid = u.userid order by r.report desc;";
  db.query(sqlSelect,  (err, result) => {
      if (err) console.log(err);
      //console.log(result);
      res.json(result);
  });
}); 

app.get('/api/myreviews', (req, res) => {
  console.log("my reviews");
  var userid = req.query.id;
  console.log(userid);
  const sqlSelect = "SELECT * FROM Review r, Movies m WHERE r.movieid = m.movieid and r.userid = ? order by r.rating DESC;";
  // const sqlSelect = "SELECT r.reviewid, r.movieid, m.name, r.rating FROM Review r, Movies m WHERE r.movieid = m.movieid and r.userid = ?;";
  db.query(sqlSelect, [userid], (err, result) => {
      if (err) console.log(err);
      //console.log(result);
      res.json(result);
  });
}); 

app.get('/api/getgenres', (req, res) => {
  const sql = "SELECT DISTINCT genre FROM Movies;"
  db.query(sql, (err, result) => {
      res.send(result);
  });
});


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

// console.log(`Password generator listening on ${port}`);