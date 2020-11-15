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
}, []);

const addFavorite = (movieid, cur_userid) => {
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
  fetch("/api/insertfriendfavorite");
};


return (
  <div>
    <Nav/>
    <h1>{friend_username}'s Favorites</h1>
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
  </div>
);
}

export default FriendPage;
