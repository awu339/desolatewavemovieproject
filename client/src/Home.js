import React, { useState, useEffect } from 'react';
import './App.css';
//import { Row, Col, Container } from 'reactstrap';
import { Grid, Row, Col } from 'react-bootstrap';
import Nav from './Nav';
import { Link } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import image from './nomovie.jpg';

function Home() {
  const [topMovies, setTopMovies] = useState([]);
  const [recentMovies, setRecentMovies] = useState([]);
  const [number, setNumber] = useState(0);
  const userid = localStorage.getItem('userid');
  const username = localStorage.getItem('username');
  const [profileInfo, setProfileInfo] = useState([]);

  useEffect(() => {
    fetch("/api/gettopmovies")
    .then(response => response.json())
    .then(data => {
      setTopMovies(data);
      setNumber(10);
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
      setProfileInfo(data);
    });
  }, []);  

  const options = [
    'Top 10', 'Top 25', 'Top 50'
  ];
  const defaultOption = options[0];

  return (
    <div>
      <Nav/>
      <h1>Welcome {username}!</h1>
      {profileInfo.map((val) => {
        var date = val.date_created.split("T");
        date = date[0];
        return (
        <p>
          User Type: {val.type} | 
          Date Created: {date}
        </p>
        );
      })}
      <div className = "search">
      <Grid>
        <Row>
          <Col className = "scroll2">
          <h2>Top Rated Movies</h2>
          <div className = "search">
            <Dropdown 
              options={options} 
              value={defaultOption} 
              placeholder="Options" 
              onChange={(e) => {
                if (e.value == "Top 10" || e.value == "") {
                  setNumber(10);
                } else if (e.value == "Top 25") {
                  setNumber(25);
                } else if (e.value == "Top 50") {
                  setNumber(50);
                } 
              }}
              className = "skinny-dropdown"
            />
          </div>

          {topMovies.slice(0,number).map((movie) => {
            if(movie.poster == "N/A"){
              return (
                <div className = "left">
                  <Link to={{ 
                    pathname: "/MoviePage", 
                    state: [{userid: userid, movieid: movie.movieid}]  
                    }}> 
                    <img className="icon-img" src={image}  alt="poster"/>
                  </Link>
                  <Link to={{ 
                    pathname: "/MoviePage", 
                    state: [{userid: userid, movieid: movie.movieid}]  
                    }}> {movie.name} 
                  </Link> | Rating: {movie.rating}
                </div>
                );
            }
            else{  
              return ( 
                <div className = "left">
                  <Link to={{ 
                    pathname: "/MoviePage", 
                    state: [{userid: userid, movieid: movie.movieid}]  
                    }}> 
                    <img className="movie-img" src={movie.poster} alt="poster"/> 
                  </Link>
                  <Link to={{ 
                    pathname: "/MoviePage", 
                    state: [{userid: userid, movieid: movie.movieid}]  
                    }}> {movie.name} 
                  </Link> | Rating: {movie.rating}
                </div>
              );
            }
          })}
          </Col>
          <Col className = "scroll2">
            <h2>Recently Released Movies</h2>
              {recentMovies.map((movie) => {
                if(movie.poster == "N/A") {
                  return (
                    <div className = "left">
                      <Link to={{ 
                        pathname: "/MoviePage", 
                        state: [{userid: userid, movieid: movie.movieid}]  
                        }}> 
                        <img className="icon-img" src={image} alt={movie.name}/>
                      </Link>
                      <Link to={{ 
                      pathname: "/MoviePage", 
                      state: [{userid: userid, movieid: movie.movieid}]  
                      }}> {movie.name} 
                      </Link>, {movie.year}
                    </div>
                  );
                }
                else{ 
                  return (
                    <div className = "left">
                      <Link to={{ 
                        pathname: "/MoviePage", 
                        state: [{userid: userid, movieid: movie.movieid}]  
                        }}> 
                        <img className="movie-img" src={movie.poster} alt={movie.name}/>
                      </Link>
                      <Link to={{ 
                        pathname: "/MoviePage", 
                        state: [{userid: userid, movieid: movie.movieid}]  
                        }}> {movie.name} 
                        </Link>, {movie.year} 
                    </div>
                  );
                }
              })}
          </Col>
        </Row>
      </Grid>
      </div>
    </div>
  );
}

export default Home;
