import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import Nav from './Nav';
import { Link } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

function Search() {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [searchResult, setResult] = useState([]);
  const [dropdownType, setType] = useState('');
  const [numresults, setnumresults] = useState(0);
  const userid = localStorage.getItem('userid');

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
      fetch("/api/getsearchgenre?genre=" + genre)
      .then(response => response.json())
      .then(data => {
        setResult(data);
        setnumresults(data.length);
      });
    } else {
      console.log("Invalid search submitted")
    }
  };

  const options = [
    'Title', 'Year', 'Genre'
  ];
  const defaultOption = options[0];

  return (
    <div>
      <Nav />
      <h1>Search</h1>
      <div className="search">
        <Dropdown 
          options={options} 
          value={defaultOption} 
          placeholder="Search by..." 
          onChange={(e) => {
            setType(e.value);
          }}
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
              } else {

              }
            }
          }
        />
        <span>
          <button onClick = {submitQuery}>Search</button>
          <button onClick = {sortByName}>Sort by name</button>
          <button onClick = {sortByYear}>Sort by year</button>
          <button onClick = {sortByGenre}>Sort by genre</button>
        </span>
        <p>{numresults} results</p>
      </div>

      <div className="resultsBox">
        {searchResult.map((val) => {
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
        })}
      </div>
    </div>
  );
}

export default Search;
