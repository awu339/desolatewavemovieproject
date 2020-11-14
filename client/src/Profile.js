import './App.css';
import Nav from './Nav';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
var userid = localStorage.getItem('userid');

function Profile() {
  const [profileInfo, setProfileInfo] = useState([]);
  const [myReviews, setMyReviews] = useState([]);
  const userid = localStorage.getItem('userid');
  const username = localStorage.getItem('username');
  //const userid = localStorage.getItem('userid');

  useEffect(() => {
    fetch("/api/getprofile?id=" + userid)
    .then(response => response.json())
    .then(data => {
      console.log("here");
      console.log(data);
      setProfileInfo(data);
    });

  }, []);  

  useEffect(() => {
    fetch("/api/myreviews?id=" + userid)
    .then(response => response.json())
    .then(data => {
      setMyReviews(data);
    });

  }, []);   

  return (
    <div>
      <Nav/>
      <h1>My Reviews</h1>
      {myReviews.map((val) => {
        return (
        <p>
          Movie: {val.name} | 
          Rating: {val.rating} | 
          Review #: {val.reviewid} | 
          <Link to={{ pathname: "/MoviePage", 
                state: [{movieid: val.movieid}]  
                }}> show
         </Link>
        </p>
        );
      })}
    </div>
  );
}

export default Profile;
