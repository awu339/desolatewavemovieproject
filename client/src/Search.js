import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import Nav from './Nav';
import { Link } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import image from './nomovie.jpg';
import { Grid, Row, Col } from 'react-bootstrap';

function Search() {
  const [genres, setGenres] = useState([]);
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [searchResult, setResult] = useState([]);
  const [dropdownType, setType] = useState('');
  const [numresults, setnumresults] = useState(0);
  const userid = localStorage.getItem('userid');

  useEffect(() => {
    fetch("/api/getgenres")
    .then(response => response.json())
    .then(data => {
      if (data != null) {
        var set = new Set();
        var array = [];
        let i;
        for (i = 0; i < data.length; i++) {
          let e = data[i].genre;
          let ee = e.split(", ");
          let j;
          for (j = 0; j < ee.length; j++) {
            set.add(ee[j]);
          }
        }
        var sett = set.keys();

        let k;
        for (k = 0; k < set.size; k++) {
          array.push(sett.next().value);
        }
        setGenres(array);
      }
    }); 
  }, []);

  const sortByName = () => {
    let newList = [...searchResult];
    newList.sort((a, b) => a.name.localeCompare(b.name));
    setResult(newList);
  }

  const sortByYear = () => {
    let newList = [...searchResult];
    newList.sort((a, b) => b.year - a.year);
    setResult(newList);
  }

  const sortByGenre = () => {
    let newList = [...searchResult];
    newList.sort((a, b) => a.genre.localeCompare(b.genre));
    setResult(newList);
  }

  const submitQuery = () => {
    if (dropdownType == "Title" || dropdownType == "") {
      fetch("/api/getsearchtitle?title=" + title)
      .then(response => response.json())
      .then(data => {
        setResult(data);
        setnumresults(data.length);
      });
    } else if (dropdownType == "Year") {
      fetch("/api/getsearchyear?year=" + year)
      .then(response => response.json())
      .then(data => {
        setResult(data);
        setnumresults(data.length);
    });
    } else if (dropdownType == "Genre") {
      searchGenre();
    } else {
      console.log("Invalid search submitted")
    }
  };

  const searchGenre = () => {
    fetch("/api/getsearchgenre?genre=" + genre)
    .then(response => response.json())
    .then(data => {
      setResult(data);
      setnumresults(data.length);
    });
  }

  const options = [
    'Title', 'Year', 'Genre'
  ];
  const defaultOption = options[0];

  console.log(userid);
  if (userid == null) {
    return (
      <div>
        You may not view this site. Please login.
      </div>
    );
  }
  else {
  return (
    <div>
      <Nav />
      <h1>Search</h1>
      <div className = "search">
        <div className="search-section">
        
          <div className = "search">
          <Dropdown 
            id = "search-by"
            options={options} 
            value={defaultOption} 
            placeholder="Search by..." 
            onChange={(e) => {
              setType(e.value);
            }}
            className='skinny-dropdown'
          />
          <input 
            type="text" 
            name="title" 
            onChange={(e) => {
                if (dropdownType == "Title" || dropdownType == "") {
                  setTitle(e.target.value);
                } else if (dropdownType == "Year") {
                  setYear(e.target.value);
                } else if (dropdownType == "Genre") {
                  setGenre(e.target.value);
                } else { }
              }
            }
          />
          </div>

          <span>
            <button className = "newb" onClick = {submitQuery}>Search</button>
            <button className = "newb" onClick = {sortByName}>Sort by name</button>
            <button className = "newb" onClick = {sortByYear}>Sort by year</button>
            <button className = "newb" onClick = {sortByGenre}>Sort by genre</button>
          </span>
          
          <p>{numresults} results</p>
            <h2>Display by genre</h2>
            <div  className = "search">
            <Dropdown 
              options={genres} 
              value={genres[0]} 
              placeholder="Genres" 
              onChange={(e) => {
                setGenre(e.value);
              }}
              className='skinny-dropdown'
            />
            </div>
            <button className = "newb" onClick = {searchGenre}>Display</button>
        </div>
        </div>
        
        <div className = "search">
          <div className="resultsBox">
            {searchResult.map((val) => {
              if (val.poster == "N/A") {
                return (  
                  <div className="movie-block">
                    <Link to={{ 
                      pathname: "/MoviePage", 
                      state: [{userid: userid, movieid: val.movieid, watched: 1}]  
                      }}> 
                      <img className="movie-img" src={image} alt="poster"/>
                    </Link>
                    
                    <span className="movie-text">
                      <Link to={{ 
                        pathname: "/MoviePage", 
                        state: [{userid: userid, movieid: val.movieid, watched: 1}]  
                        }}> 
                        {val.name}
                      </Link>
                      , {val.year}
                      <br />
                      {val.genre}
                    </span>
                    <hr/>
                  </div>
                );
              }
              else{
                return (  
                  <div className="movie-block">
                    <Link to={{ 
                      pathname: "/MoviePage", 
                      state: [{userid: userid, movieid: val.movieid, watched: 1}]  
                      }}> 
                      <img className="movie-img" src={val.poster} alt="poster"/>
                    </Link>
                    
                    <span className="movie-text">
                      <Link to={{ 
                        pathname: "/MoviePage", 
                        state: [{userid: userid, movieid: val.movieid, watched: 1}]  
                        }}> 
                        {val.name}
                      </Link>
                      , {val.year}
                      <br />
                      {val.genre}
                    </span>
                    <hr/>
                  </div>
                );
              }
            })}
          </div>
        </div>
    </div>
  );
  }
}

export default Search;
