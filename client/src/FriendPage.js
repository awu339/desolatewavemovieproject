import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import Nav from './Nav';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
var friend_username = "";

function FriendPage(props) {
    const [favoritesList, setFavoritesList] = useState([]);
    const userid = localStorage.getItem('userid');

useEffect(() => {
    console.log("getting one movie");
    var userid = props.location.state[0].userid;
    friend_username = props.location.state[0].username;
    //friend_userid = userid;
    console.log(userid);
    Axios.get("http://localhost:3001/api/getfriendfav?id=" + userid)
    .then((response) => {
        setFavoritesList(response.data);
    })
   
}, []);

const addFavorite = (movieid, cur_userid) => {
    console.log('adding favorite');
    Axios.post(`http://localhost:3001/api/insertfriendfavorite`, {
        movieid: movieid,
        userid: userid
    })
    .then(() => alert('success'));
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
