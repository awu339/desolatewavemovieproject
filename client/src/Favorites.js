import React, { useState, useEffect } from 'react';
import './App.css';
import Nav from './Nav';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

function Favorites() {
  const [favoritesList, setFavoritesList] = useState([]);
  const userid = localStorage.getItem('userid');
  console.log("current user is " + userid);
  
  let unfavorite = (movieid, userid) => {
    fetch("/api/delete?id=" + movieid + "&userid=" + userid);
    window.location.href = "/Favorites";
  };

  let watched = (movieid) => {
    fetch("/api/watched?id=" + movieid + "&userid=" + userid);
    window.location.href = "/Favorites"
  };
 
  useEffect(() => {
    fetch("/api/getfavorites?id=" + userid)
      .then(response => response.json())
      .then(data => {
        setFavoritesList(data);
      });
  }, []);   

  return (
    <div>
      <Nav />
      <h1>My Favorites</h1>
          {favoritesList.map((val) => {
          console.log(userid);
          var watchval = "";
          if (val.watched == 1){
            var watchval = "Yes"
          }
          else{
            var watchval = "No"
          }
          return (
            <p>
              Title: <Link to={{ 
                pathname: "/MoviePage", 
                state: [{userid: userid, movieid: val.movieid}]  
                }}> {val.name} 
              </Link> |
              Year: {val.year} | 
              Synopsis: {val.synopsis} |
              Watched: {watchval}
              <br />
              <button className = "newb" onClick={() => {unfavorite(val.movieid, userid)}}> Unfavorite </button> 
              {' '}
              <button className = "newb" onClick={() => {watched(val.movieid, userid)}}> Watched </button>
           </p>
          );
          })} 
    </div>
  );
}
 
export default Favorites;
