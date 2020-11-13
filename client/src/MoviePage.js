import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import Nav from './Nav';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button } from 'reactstrap';

function MoviePage(props) {
    const [movieList, setMovieList] = useState([]);
    //const [userid, setUserID] = useState('');
    const [movieid, setMovieID] = useState('');
    const [watched, setWatched] = useState('');
    const [movie, setMovie] = useState([]);
    const[favorite, setFavorite] = useState([]);
    const[reviewexists, setReviewExists] = useState([]);
    const [reviews, setReviews] = useState([]);
    //var [username, setUsername] = useState('');
    var [rating, setRating] = useState("");
    var [review, setReview] = useState("");
    var [date, setDate] = useState("");

    const userid = localStorage.getItem('userid');
    const type = localStorage.getItem('type');
    const username = localStorage.getItem('username');
    console.log("username" + username);
    var flag = "";

useEffect(() => {
  var movieid= props.location.state[0].movieid;
  fetch("/api/getmovie?id=" + movieid)
    .then(response => response.json())
    .then(data => {
      console.log("here");
      console.log(data);
      setMovie(data);
    });   
}, []);

const addFavorite = (movieid) => {
  var user = {
    movieid: movieid,
    userid: userid
  };

  var options = {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
        'Content-Type': 'application/json'
    }
  }
  fetch("/api/insertfavorite", options)
    .then(response => response.json())
    .then(data => {
      console.log("favorites");
      console.log(data);
    }); 
};

/* const getUsername = (userid) => {
  Axios.get(`http://localhost:3001/api/getusername`, {
        userid: userid
    })
    .then((response) => {
      console.log('get username' + response.data);
      return response.data;
    })
}; */

const submitReview = () => {
  var review = {
    userid: userid,
      rating: rating,
      review: review,
      date: date,
      movieid: movieid
  };
  var options = {
    method: 'POST',
    body: JSON.stringify(review),
    headers: {
        'Content-Type': 'application/json'
    }
  }
  fetch("/api/submitreview", options); 
  window.location.href = "/MoviePage";
};

const UpdateReview = () => {
  var review = {
    userid: userid,
      rating: rating,
      review: review,
      date: date,
      movieid: movieid
  };

  var options = {
    method: 'POST',
    body: JSON.stringify(review),
    headers: {
        'Content-Type': 'application/json'
    }
  }
  fetch("/api/insertfavorite", options);
  window.location.href = "/MoviePage";
};

//change review table
const report = (reviewid) => {
  fetch("/api/report?id=" + reviewid)
    .then(response => response.json()); 
};  

const deleteReview = (reviewid) => {
  fetch("/api/deletereview?id=" + reviewid)
    .then(response => response.json());

  window.location.href = "/MoviePage";
};  

/* const flagReport = (report) => {
  console.log(report);
  if (report >= 4){
    flag = 1;
  }
  else{
    flag = 0;
  }
};
 */

return (
  <div>
    <Nav/>
    {movie.map((val) => {
      console.log("rendering the movie");
      console.log(reviewexists);
      
      if (reviewexists === undefined || reviewexists.length == 0){
        return (
        <div className = "movie-info">
          <h2>{val.name} </h2>
          <img className="movie-page-img" src = {val.poster} alt="Poster"/>
          <br/> Year: {val.year} 
          <br/> Genre: {val.genre} 
          <br/> Synopsis: {val.plot} 
          <br/> Director: {val.director}
          <br/> Actors: {val.actors} 
          <br/> Runtime: {val.runtime}
          <br/> <Button outline color="primary" className="w-25" onClick={() => addFavorite(val.movieid)}>Add Favorite</Button>

          <h1>Leave a Review</h1>
          <label>Rating</label> 
          <input
        type="number"
        min="0"
        max="5"
        name="rating"
        onChange={(e) => {
          setRating(e.target.value);
        }}
      />
      <br/> <label>Review</label> 
      <input
        type="text"
        name="review"
        onChange={(e) => {
          setReview(e.target.value);
        }}
      />
              
      <br/><Button outline color="primary" className="w-25" onClick = {submitReview}>Submit</Button>
        </div>
        );}
  
        else{
          return (
            <p>
              <h2>{val.name} </h2>
          <img className="movie-page-img" src = {val.poster} alt="Poster"/>
          <br/> Year: {val.year} 
          <br/> Genre: {val.genre} 
          <br/> Synopsis: {val.plot} 
          <br/> Director: {val.director}
          <br/> Actors: {val.actors} 
          <br/> Runtime: {val.runtime}
          <br/> <Button outline color="primary" className="w-25" onClick={() => addFavorite(val.movieid)}>Add Favorite</Button>

          <h1>Update Your Review</h1>
          <br/>User: {username}
          <br/>Rating: {reviewexists[0].rating}
          <br/>Review: {reviewexists[0].content}
          <br/>
          <br/> <label>New Rating</label> 
          <input
        type="number"
        min="0"
        max="5"
        name="rating"
        onChange={(e) => {
          setRating(e.target.value);
        }}
      />
      <br/> <label>New Review</label> 
      <input
        type="text"
        name="review"
        onChange={(e) => {
          setReview(e.target.value);
        }}
      />
      <br/><Button outline color="primary" className="w-25" onClick = {UpdateReview}>Update</Button>
     <br/> <Button outline color="primary" className="w-25" onClick={() => deleteReview(reviewexists[0].reviewid)}>Delete</Button>

            </p>
          );
        }
        
      })}
    <br />
    <h1>All Reviews</h1>
    
    {reviews.map((val) => {
      if (type == "admin"){
        return (
          <p>
            User: {val.userid} | 
            Rating: {val.rating} | 
            Date: {val.date}
            <br/> Review: {val.content} | 
            Reported: {val.report}
            
            <br/> <Button outline color="primary" className="w-25" onClick={() => report(val.reviewid)}>Report</Button> 
            {" "} 
            <Button outline color="primary" className="w-25" onClick={() => deleteReview(val.reviewid)}>Delete</Button>
          </p>
        );
      }
      else{
        return (
          <p>
            User: {val.userid} | 
            Rating: {val.rating} | 
            Date: {val.date}
            <br/> Review: {val.content}
            {" "} <br/> <Button outline color="primary" className="w-25" onClick={() => report(val.reviewid)}>Report</Button>
          </p>
        );
      }
     
    })}
  </div>
);
}

export default MoviePage;
