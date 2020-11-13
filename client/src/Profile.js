import './App.css';
import Nav from './Nav';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
var userid = localStorage.getItem('userid');

function Profile() {
  const [profileInfo, setProfileInfo] = useState([]);
  //const userid = localStorage.getItem('userid');

  useEffect(() => {
    Axios.get("http://localhost:3002/api/getprofile?id=" + userid)
    .then((response) => {
      setProfileInfo(response.data);
      console.log(userid);
    }); 
  }, []);  

  return (
    <div>
      <Nav/>
      <h1>Profile</h1>
      {profileInfo.map((val) => {
        return (
        <p>
          Userid: {val.userid} 
          <br />
          Username: {val.username} 
          <br />
          User type: {val.type} 
          <br />
          Date created: {val.date_created}
        </p>
        );
      })}
    </div>
  );
}

export default Profile;
