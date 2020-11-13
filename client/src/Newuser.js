import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import Nav from './Nav';

function Newuser() {
    //const [userID, setUserID] = useState('');
    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');
    var [type, setType] = useState('');
    const [userList, setUserList] = useState([]);

    /* useEffect(() => {
        Axios.get("http://localhost:3001/api/getusers")
        .then((response) => {
          setUserList(response.data);
        }); 
    }, []); */

    const submitUser = () => {
        console.log('here2');
        console.log(username);
        Axios.post('/api/insert', {
            //userID: userID, 
            username: username, 
            pwd: pwd, 
            type: type
        }).then(() => {
            alert("success");
        });
        window.location.href = "http://localhost:3000/";
    };

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
            <label>Type:</label>
            <input 
                type="text" 
                name="type" 
                onChange={(e)=> {
                  if(e.target.value == "cS3!6") {
                    setType("admin");
                  } else {
                    setType("user");
                  }
                }} 
            />
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