import React, { useState, useEffect } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Nav from './Nav';
var type = "user";
var adminCode = "wrong";

function Newuser() {
    //const [userID, setUserID] = useState('');
    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');
    //var [type, setType] = useState('');
    //var [adminCode, setAdminCode] = useState('');
    const [userList, setUserList] = useState([]);

    /* useEffect(() => {
        Axios.get("http://localhost:3001/api/getusers")
        .then((response) => {
          setUserList(response.data);
        }); 
    }, []); */
 
    const submitUser = () => {
      console.log("admincode: " + adminCode + " | " + type);
      fetch("/api/checkuser?id=" + username)
      .then(response => response.json())
      .then(data => {
        if (data !== undefined || data.length > 0){
          alert('Username is already taken. Please try again with a different username.');
        }
        else{
          if(type === "admin" && adminCode != "cs316") {
            alert('Incorrect Admin Code. Please Enter a Valid Code.');
          } else {
          var user = {
            username: username,
            pwd: pwd, 
            type: type
          };
          var options = {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
          }
          fetch("/api/insert", options); 
    
          window.location.href = "/";
          }
        }
      });   
      
    };

    function displayCode() {
      var cont = document.getElementById('cont');
      if (cont.style.display == 'block') {
          cont.style.display = 'none';
      }
      else {
          cont.style.display = 'block';
      }
  }
  

  return (
    <div>
      
      <h1>Register new user</h1>
        <div className="form">
           {/*  <label>UserID:</label>
            <input 
                type="text" 
                name="userID" 
                onChange={(e)=> {
                setUserID(e.target.value)
                }} 
            /> */}
            <label>Username:</label>
            <input 
                type="text" 
                name="username" 
                onChange={(e)=> {
                setUsername(e.target.value)
                }} 
            />
            <label>Password:</label>
            <input 
                type="text" 
                name="pwd" 
                onChange={(e)=> {
                setPwd(e.target.value)
                }} 
            />
            <label>Select User Type</label>
            <select id="sel" onChange={displayCode}>
            <option value="1" >User</option>
            <option value="2" selected>Admin</option> </select>
            <div id="cont" style={{display:"block"}}>
              Admin Code: 
              <input 
                      type="text" 
                      name="type" 
                      onChange={(e)=> {
                        //setAdminCode(e.target.value);
                        adminCode = e.target.value;
                        /* if(e.target.value == "cs316") {
                          type = "admin";
                        } else {
                          type = "user";
                        } */
                        type = "admin";
                      }} 
                  />
            </div>
            <button className = "newb" onClick = {submitUser}>Submit</button>
            {" "}
            <Link to = '/'><button className = "newb"> Back to Login </button></Link>
             {/* {userList.map((val) => {
              return (
              <p>
                Username: {val.username} |
                Date created: {val.date_created}
              </p>
              );
            })} */}
        </div>
    </div>
  );
}

export default Newuser;