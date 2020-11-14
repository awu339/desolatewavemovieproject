import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import Nav from './Nav';
import { Link } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import image from './nomovie.jpg';

function Home() {
  const [topMovies, setTopMovies] = useState([]);
  const [recentMovies, setRecentMovies] = useState([]);
  const [number, setNumber] = useState(0);
  const [dropdown, setDropdown] = useState("");
  const userid = localStorage.getItem('userid');
  const [profileInfo, setProfileInfo] = useState([]);
  useEffect(() => {
    fetch("/api/gettopmovies")
    .then(response => response.json())
    .then(data => {
      setTopMovies(data);
    }); 
  }, []);

  useEffect(() => {
    fetch("/api/getrecentmovies")
    .then(response => response.json())
    .then(data => {
      setRecentMovies(data);
    }); 
  }, []);

  useEffect(() => {
    fetch("/api/getprofile?id=" + userid)
    .then(response => response.json())
    .then(data => {
      console.log("here");
      console.log(data);
      setProfileInfo(data);
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
      <h1>Welcome {username}!</h1>
      {profileInfo.map((val) => {
        var date = val.date_created.split("T");
        date = date[0];
        return (
        <p>
          User type: {val.type} | 
          Date created: {date}
        </p>
        );
      })}
      <Container fluid>
      <Row>
        <Col>
        <h1>TOP!!! trending movies 2020</h1>
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
        if(movie.poster == "N/A"){
          return (
          
            <div>
              {movie.name} | Rating: {movie.rating}
              <Link to={{ 
                pathname: "/MoviePage", 
                state: [{userid: userid, movieid: movie.movieid, watched: 1}]  
                }}> 
                <img className="icon-img" src={image}  alt="poster"/>
              </Link>
            </div>
            );
        }
        else{  
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
        }
      })}
        </Col>
        <Col>
        <h1>Recent Movies</h1>
          {recentMovies.map((movie) => {
            if(movie.poster == "N/A"){
              return (
                <div>
                  {movie.name} | 
                  <Link to={{ 
                    pathname: "/MoviePage", 
                    state: [{userid: userid, movieid: movie.movieid, watched: 1}]  
                    }}> 
                    <img className="icon-img" src={image} alt={movie.name}/>
                  </Link>
                </div>
                );
            }
            else{ 
              return (
            
                <div>
                  {movie.name} | 
                  <Link to={{ 
                    pathname: "/MoviePage", 
                    state: [{userid: userid, movieid: movie.movieid, watched: 1}]  
                    }}> 
                    <img className="movie-img" src={movie.poster} alt={movie.name}/>
                  </Link>
                  </div>
                );
           }
          })}
        </Col>
      </Row>

      </Container>
    </div>
  );
}

export default Home;

//<img src = "titanic_movieposter.jpg" alt ="image"/>