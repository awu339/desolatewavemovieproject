import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import Nav from './Nav';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
var friend_username = "";
var userid = "";
var userfavlist = [];
var arr = [1];

function FriendPage(props) {
  const[friendexists, setFriendExists] = useState([]);
  const [favoritesList, setFavoritesList] = useState([]);
  const [reviewsListLimit, setReviewsListLimit] = useState([]);
  const userid1 = localStorage.getItem('userid');

useEffect(() => {
    userid = props.location.state[0].userid;
    friend_username = props.location.state[0].username;
    fetch("/api/getfriendfav?id=" + userid)
    .then(response => response.json())
    .then(data => {
        setFavoritesList(data);
    });
    fetch("/api/getfriendreviewslimit?id=" + userid)
    .then(response => response.json())
    .then(data => {
        setReviewsListLimit(data);
    });
    console.log("users");
    console.log(userid1);
    console.log(userid);
    fetch("/api/friendexists?id=" + userid1 + "&userid=" + userid)
    .then(response => response.json())
    .then(data => {
        setFriendExists(data);
        console.log("let's see if this works");
        console.log(data);
    });
}, []);

let unfriend = (userid) => {
  fetch("/api/unfriend?id=" + userid1 + "&userid=" + userid);
  window.location.href = "/FriendPage";
};

/* let addfriend = (userid) => {
  console.log("am i getting here?");
  console.log(userid);
  console.log(userid1);
  fetch("/api/addfriend?id=" + userid1 + "&userid=" + userid);
  window.location.href = "/FriendPage";
}; */

const addfriend = (userid) => {
  var user = {
    user1: userid1,
    user2: userid
  };

  var options = {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
        'Content-Type': 'application/json'
    }
  }
  fetch("/api/addfriend", options)
    .then(response => response.json())
    .then(data => {
      console.log("friend");
      console.log(data);
      window.location.href = "/FriendPage";
    }); 
};

let unfavorite = (movieid, userid1) => {
  fetch("/api/delete?id=" + movieid + "&userid=" + userid1);
};

const addFavorite = (movieid) => {
  var user = {
    movieid: movieid,
    userid: userid1
  };
  var options = {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
        'Content-Type': 'application/json'
    }
  }
  fetch("/api/insertfriendfavorite", options);
};


return (
  <div>
    <Nav/>
    <h1>{friend_username}'s Profile</h1>

    <h2>{friend_username}'s Favorites</h2>
    {favoritesList.map((val) => {
    
    var watchval = "";
    if (val.watched == 1){
      var watchval = "Yes"
    }
    else{
      var watchval = "No"
    }
    return (
      <p>
        Movie: {val.name} |
        Year: {val.year} | 
        Synopsis: {val.synopsis} |
        Watched: {watchval}
        <br />
        <button onClick={() => addFavorite(val.movieid)}>Add Favorite</button>
     </p>
    );
    })} 
    <h2>{friend_username}'s Top 10 Rated Movies</h2>

    {reviewsListLimit.map((val) => {
      var date = val.date.split("T");
      date = date[0];
      return (
        <p>
          Movie: <Link to={{ 
                pathname: "/MoviePage", 
                state: [{userid: userid1, movieid: val.movieid}]  
                }}> {val.name}</Link> |
          Rating: {val.rating} | 
          Date Reviewed: {date} 
          <br/> Review: {val.content}
      </p>
      );
    })}

    {arr.map(() => {
      console.log("does friendexists exist");
      console.log(friendexists);
      if(friendexists === undefined || friendexists.length === 0){
        return(
          <p>
          <br/> <button className = "newb" onClick={() => {addfriend(userid)}}> Add Friend </button> 
          </p>
        )
      }
      else{
        return(
          <p>
          <br/> <button className = "newb" onClick={() => {unfriend(userid)}}> Remove Friend </button> 
          </p>
        )
      }

    }

    )}
  </div>
);
}

export default FriendPage;
