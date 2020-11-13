import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import Nav from './Nav';
import { Link } from 'react-router-dom';

function Friends() {
    const [friendFavList, setFriendFavList] = useState([]);
    const userid = localStorage.getItem('userid');

    useEffect(() => {
        Axios.get("http://localhost:3002/api/getfriends?id=" + userid)
        .then((response) => {
          setFriendFavList(response.data);
          console.log(response.data);
        }); 
    }, []);  
      
    return (
        <div>
            <Nav/>
            <h1>Friends</h1> 
            {friendFavList.map((val) => {
            return (
                <p>
                Username: 
                <Link to={{ 
                pathname: "/FriendPage", 
                state: [{userid: val.userid, username: val.username}]  
                }}> {val.username} </Link>
                <br />
            </p>
            );        
            })}        
        </div>
    );
}
    
export default Friends;
    