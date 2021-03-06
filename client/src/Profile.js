import './App.css';
import Nav from './Nav';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
var arr = [1];

function Profile() {
  const [myReviews, setMyReviews] = useState([]);
  const userid = localStorage.getItem('userid');

/*   useEffect(() => {
    fetch("/api/getprofile?id=" + userid)
    .then(response => response.json())
    .then(data => {
      console.log("here");
      console.log(data);
      setProfileInfo(data);
    });

  }, []);   */

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
      {arr.map(() => {
         if (myReviews === undefined || myReviews.length === 0){
           return (
             <p>
               You have written 0 reviews.
             </p>
           )
         }
      })}
      {myReviews.map((val) => {
        var date = val.date.split("T");
        date = date[0];
        return (
        <p>
          Movie: <Link to={{ pathname: "/MoviePage", 
                state: [{movieid: val.movieid}]  
                }}>{val.name}</Link> | 
          Rating: {val.rating} | 
          Date Reviewed: {date} 
          <br/> Review: {val.content}
        </p>
        );
      })}
    </div>
  );
}

export default Profile;
