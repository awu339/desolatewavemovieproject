import React, { useState, useEffect } from 'react';
import './App.css';
import Nav from './Nav';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import image from './nomovie.jpg';
var arr = [1];

function MoviePage(props) {
    const [movie, setMovie] = useState([]);
    const[reviewexists, setReviewExists] = useState([]);
    const[favexists, setFavExists] = useState([]);
    const [reviews, setReviews] = useState([]);
    var [rating, setRating] = useState("");
    var [review, setReview] = useState("");
    var [date, setDate] = useState("");

    const userid = localStorage.getItem('userid');
    const type = localStorage.getItem('type');
    const username = localStorage.getItem('username');
    var flag = "";

useEffect(() => {
  var movieid= props.location.state[0].movieid;
  fetch("/api/getmovie?id=" + movieid)
  .then(response => response.json())
  .then(data => {
    setMovie(data);
  });

  fetch("/api/getreviews?id=" + movieid)
  .then(response => response.json())
  .then(data => {
    setReviews(data);
  });  
    
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
  fetch("/api/reviewexists?id=", options)
  .then(response => response.json())
  .then(data => {
    setReviewExists(data);
  }); 

  var user2 = {
    movieid: movieid,
    userid: userid
  };
  var options2 = {
    method: 'POST',
    body: JSON.stringify(user2),
    headers: {
        'Content-Type': 'application/json'
    }
  }
  fetch("/api/favexists?id=", options2)
  .then(response => response.json())
  .then(data => {
    setFavExists(data);
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
  var movieid = props.location.state[0].movieid;
  setDate("" + Date.now());

  var currreview = {
    userid: userid,
      rating: rating,
      review: review,
      date: date,
      movieid: movieid
  };
  var options = {
    method: 'POST',
    body: JSON.stringify(currreview),
    headers: {
        'Content-Type': 'application/json'
    }
  }
  console.log("submit");

  fetch("/api/submitreview", options)
  .then(response => response.json())
    .then(data => {
      console.log("submit");
      console.log(data);
    }); 
  window.location.href = "/MoviePage";
};

const UpdateReview = () => {
  var movieid = props.location.state[0].movieid;
  setDate("" + Date.now());

  var currreview = {
    userid: userid,
      rating: rating,
      review: review,
      date: date,
      movieid: movieid
  };

  var options = {
    method: 'POST',
    body: JSON.stringify(currreview),
    headers: {
        'Content-Type': 'application/json'
    }
  }
  fetch("/api/updatereview", options);
  window.location.href = "/MoviePage";
};

//change review table
const report = (reviewid) => {
  fetch("/api/report?id=" + reviewid)
    .then(response => response.json()); 
    window.location.href = "/MoviePage";
};  

const deleteReview = (reviewid) => {
  fetch("/api/deletereview?id=" + reviewid)
    .then(response => response.json());

  window.location.href = "/MoviePage";
};  

return (
  <div>
    <Nav/>
    {movie.map((val) => {
      console.log("rendering the movie");
      console.log(reviewexists);
      
      var x = "";
      if (val.poster == "N/A") {
        x = image;
      }
      else {
        x = val.poster;
      }

      if (favexists === undefined || favexists.length === 0){
        return (
          <div className = "movie-info">
         <h2>{val.name} </h2>
         <img className="movie-page-img" src = {x} alt="Poster"/>
         <br/> Year: {val.year} 
         <br/> Genre: {val.genre} 
         <br/> Synopsis: {val.plot} 
         <br/> Director: {val.director}
         <br/> Actors: {val.actors} 
         <br/> Runtime: {val.runtime}
         <br/> <button className = "newb" onClick={() => addFavorite(val.movieid)}>Add Favorite</button>
       </div>
           );
       }
       else {
         return (
          <div className = "movie-info">
         <h2>{val.name} </h2>
         <img className="movie-page-img" src = {x} alt="Poster"/>
         <br/> Year: {val.year} 
         <br/> Genre: {val.genre} 
         <br/> Synopsis: {val.plot} 
         <br/> Director: {val.director}
         <br/> Actors: {val.actors} 
         <br/> Runtime: {val.runtime}
         <br/>
       </div>
         );}
    
    })}
    {movie.map((val) => {
      console.log("rendering the movie");
      console.log(reviewexists);
      
      var x = "";
      if (val.poster == "N/A") {
        x = image;
      }
      else {
        x = val.poster;
      }
      

      if (reviewexists === undefined || reviewexists.length === 0){
        return (
          <div className = "movie-info">

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
              className = "rating-input"
            />

            <br/> <label>Review</label> 
            <input
              type="text"
              name="review"
              size="100"
              onChange={(e) => {
                setReview(e.target.value);
              }}
              className = "review-input"
            />
                
            <br/><button className = "newb" onClick = {submitReview}>Submit</button>
          </div>
        );}
  
        else{
          return (
            <p>
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
        size="100"
        onChange={(e) => {
          setReview(e.target.value);
        }
      
      }
      />
      <br/><button className = "newb" onClick = {UpdateReview}>Update</button>
     <br/> <button className = "newb" onClick={() => deleteReview(reviewexists[0].reviewid)}>Delete</button>

            </p>
          );
        }
        
      })}
    <br />
    <h1>All Reviews</h1>
    
    {reviews.map((val) => {
      if (type == "admin"){
        var date = val.date.split("T");
        date = date[0];
        return (
          <p>
            User: <Link to={{ 
                pathname: "/FriendPage", 
                state: [{userid: val.userid, username: val.username}]  
                }}>{val.username}</Link> | 
            Rating: {val.rating} | 
            Date: {date}
            <br/> Review: {val.content} | 
            Reported: {val.report}
            
            <br/> <button className = "newb" onClick={() => report(val.reviewid)}>Report</button> 
            {" "} 
            <button className = "newb" onClick={() => deleteReview(val.reviewid)}>Delete</button>
          </p>
        );
      }
      else{
        var date = val.date.split("T");
        date = date[0];
        return (
          <p>
            User: <Link to={{ 
                pathname: "/FriendPage", 
                state: [{userid: val.userid, username: val.username}]  
                }}>{val.username}</Link> | 
            Rating: {val.rating} | 
            Date: {date}
            <br/> Review: {val.content}
            {" "} <br/> <button className = "newb" onClick={() => report(val.reviewid)}>Report</button>
          </p>
        );
      }
     
    })}
  </div>
);
}

export default MoviePage;
