import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import Nav from './Nav';
import { Link } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import image from './nomovie.jpg';
import { Grid, Row, Col } from 'react-bootstrap';
var arr = [1];

function Friends() {
    const [friendFavList, setFriendFavList] = useState([]);
    const[friendResList, setFriendResList] = useState([]);
    const userid1 = localStorage.getItem('userid');

    useEffect(() => {
    fetch("/api/getfriends?id=" + userid1)
        .then(response => response.json())
        .then(data => {
            setFriendFavList(data);
        });
    }, []);
    
    let unfriend = (userid) => {
        fetch("/api/unfriend?id=" + userid1 + "&userid=" + userid);
        window.location.href = "/Friends";
      };

      const submitQuery = (username) => {
          fetch("/api/getsearchuser?user=" + username)
          .then(response => response.json())
          .then(data => {
            setFriendResList(data);
          });
      };
      
    return (
        <div>
            <Nav/>
            <h1>Friends</h1>
            <Col className = "search-section">
            <div className="search">
              
              
              <input 
                type="text" 
                name="title" 
                onChange={(e) => {
                  }
                }
              /> </div> </Col>
            <div>
            {arr.map(() => {
                if (friendFavList === undefined || friendFavList.length === 0){
                 return (
                <p>
                    You have 0 friends.
                </p>
                    )
                }
            })} 
            {friendFavList.map((val) => {
            return (
                <p>
                Username: <Link to={{
                pathname: "/FriendPage", 
                state: [{userid: val.userid, username: val.username}]  
                }}>{val.username}</Link>
                <br />
                <button className = "newb" onClick={() => {unfriend(val.userid)}}> Remove Friend </button> 
            </p>
            );        
            })}  
            </div>      
        </div>
    );
}
    
export default Friends;
    