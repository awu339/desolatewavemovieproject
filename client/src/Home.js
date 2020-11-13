import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import Nav from './Nav';
import { Link } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

function Home() {
  const [topMovies, setTopMovies] = useState([]);
  const [recentMovies, setRecentMovies] = useState([]);
  const [number, setNumber] = useState(0);
  const [dropdown, setDropdown] = useState("");
  const userid = localStorage.getItem('userid');


  
  useEffect(() => {
    Axios.get("http://localhost:3002/api/gettopmovies")
    .then((response) => {
      if (response != null){
        setTopMovies(response.data);
      }
     
    }); 
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3002/api/getrecentmovies")
    .then((response) => {
      setRecentMovies(response.data);
    }); 
  }, []);

  const options = [
    'Top 10', 'Top 25', 'Top 50'
  ];
  const defaultOption = options[0];

  let num = 10;

  return (
   
    <div>
      <Nav/>
      <h1>Top trending movies 2020</h1>
      <Dropdown 
        options={options} 
        value={defaultOption} 
        placeholder="Options" 
        onChange={(e) => {
          
           console.log(e.value);
          if (e.value == "Top 10" || e.value == "") {
            setNumber(10);
            num = 10;
          } else if (e.value == "Top 25") {
            setNumber(25);
            num = 25;
          } else if (e.value == "Top 50") {
            setNumber(50);
            num = 50;
          } 
        }}
      />

      {topMovies.slice(0,number).map((movie) => {
        console.log(number);
        return (
        <div>
          {movie.name} | Rating: {movie.rating}
          <Link to={{ 
            pathname: "/MoviePage", 
            state: [{userid: userid, movieid: movie.movieid, watched: 1}]  
            }}> 
            <img className="movie-img" src={movie.poster} alt="poster"/>
          </Link>
        </div>
        );
      })}

      <h1>Recent Movies</h1>
      {recentMovies.map((movie) => {
        return (
        <span className = "movie-span">
          <Link to={{ 
            pathname: "/MoviePage", 
            state: [{userid: userid, movieid: movie.movieid, watched: 1}]  
            }}> 
            <img className="movie-img" src={movie.poster} alt={movie.name}/>
          </Link>
        </span>
        );
      })}
    </div>
  );
}

export default Home;

//<img src = "titanic_movieposter.jpg" alt ="image"/>