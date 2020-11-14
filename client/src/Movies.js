import React, { useState, useEffect } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import image from './nomovie.jpg';

function Movies() {
  const [movieList, setMovieList] = useState([]);
  const [numMovies, setNumMovies] = useState(0);
  const userid = localStorage.getItem('userid');

  useEffect(() => {
    fetch("/api/getmovies")
    .then(response => response.json())
    .then(data => {
      console.log("here");
      console.log(data);
      setMovieList(data);
      // const data = response.data;
      const length = data.length;
      setNumMovies(length);
    }); 
  }, []);

  return (
    <div> 
      <Nav/>
      <h1>Movies</h1>
      <p><b>Our database has {numMovies} total movies to explore.</b></p>
      <div>
        {movieList.map((val) => {
          if (val.poster === 'N/A'){
            return (
              <div className="movie-block">
                <Link to={{ 
                  pathname: "/MoviePage", 
                  state: [{userid: userid, movieid: val.movieid, watched: 0}]  
                  }}> 
                  <img className="icon-img" src={image} />
                </Link>
                <b>{val.name} </b> {val.year}
              </div>
            );
          }
          else{
            return (
              <div className="movie-block">
                <Link to={{ 
                  pathname: "/MoviePage", 
                  state: [{userid: userid, movieid: val.movieid, watched: 0}]  
                  }}> <img className="movie-img" src={val.poster}/> 
                </Link>
                <b>{val.name} </b> {val.year}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default Movies;
