import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import Nav from './Nav';

function Newuser() {
    //const [userID, setUserID] = useState('');
    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');
    var [type, setType] = useState('');
    var [adminCode, setAdminCode] = useState('');
    const [userList, setUserList] = useState([]);
    const [duplicateUser, setDuplicateUser] = useState([]);

    /* useEffect(() => {
        Axios.get("http://localhost:3001/api/getusers")
        .then((response) => {
          setUserList(response.data);
        }); 
    }, []); */

    const submitUser = () => {
      checkDuplicate();
      console.log("admincode: " + adminCode + " | " + type);
      // if(type === "admin" && adminCode != 'cs316') {
      //   alert('Incorrect Admin Code. Please Enter a Valid Code.');
      // } else 
      if(duplicateUser.length > 0){
          alert("Username already taken. Please choose another one.");
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

  function checkDuplicate(){
    fetch("/api/checkduplicate?id=" + username)
  .then(response => response.json())
  .then(data => {
    console.log("dups: " + data);
    setDuplicateUser(data);
  });
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
                        setAdminCode(e.target.value);
                        if(e.target.value == "cs316") {
                          setType("admin");
                        } else {
                          setType("user");
                        }
                      }} 
                  />
            </div>
            <button onClick = {submitUser}>Submit</button>

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