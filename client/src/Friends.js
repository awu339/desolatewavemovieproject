import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import Nav from './Nav';
import { Link } from 'react-router-dom';

function Friends() {
    const [friendFavList, setFriendFavList] = useState([]);
    const userid = localStorage.getItem('userid');

    useEffect(() => {
    fetch("/api/getfriends?id=" + userid)
        .then(response => response.json())
        .then(data => {
            setFriendFavList(data);
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
    