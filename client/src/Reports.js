import './App.css';
import Nav from './Nav';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
var arr = [1];
//var userid = localStorage.getItem('userid');

function Reports() {
    
  const [reported, setReported] = useState([]);
  //const userid = localStorage.getItem('userid');

  useEffect(() => {
    fetch("/api/allreports")
    .then(response => response.json())
    .then(data => {
      console.log("here");
      console.log(data);
      setReported(data);
      // const data = response.data;
    }); 
  }, []);


/*   useEffect(() => {
    Axios.get("http://localhost:3001/api/allreports")
    .then((response) => {
    
      setReported(response.data);
      console.log("useeffect");
      //console.log(response.data[0]);
    }) 
  }, []);    */

  return (
    <div>
      <Nav/>
      <h1>All Reported Reviews</h1>
      {arr.map(() => {
          if (reported === undefined || reported.length === 0){
            return (
              <p>
                There are 0 reviews reported.
              </p>
              )
            }
            })} 
      {reported.map((val) => {
        return (
        <p>
          Movie: {val.name} | Reported by: {val.username} | Review #: {val.reviewid} | 
          <Link to={{ pathname: "/MoviePage", 
                state: [{movieid: val.movieid}]  
                }}> show
         </Link>
          <br />
        </p>
        );
      })} 

      
    </div>
  );
}

export default Reports;
