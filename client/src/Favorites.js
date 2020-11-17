import React, { useState, useEffect } from 'react';
import './App.css';
import Nav from './Nav';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
var arr = [1];

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

  let unwatched = (movieid) => {
    fetch("/api/unwatched?id=" + movieid + "&userid=" + userid);
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
      {arr.map(() => {
         if (favoritesList === undefined || favoritesList.length === 0){
           return (
             <p>
               You have 0 movies in your Favorites.
             </p>
           )
         }
      })}
          {favoritesList.map((val) => {
            var watchval = "";
            if (val.watched == 1) {
              var watchval = "Yes"
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
                  <button className = "newb" onClick={() => {unwatched(val.movieid, userid)}}> Not Yet Watched </button>
              </p>
              );
            } 
            else {
              var watchval = "No"
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
            }
          })} 
    </div>
  );
}
 
export default Favorites;
