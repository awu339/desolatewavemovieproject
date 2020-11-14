import React, { useState, useEffect } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import Axios from 'axios';
import { Link } from 'react-router-dom';
import logo from './cinema.png';
var current_userid = "";
var current_type = "";


//localStorage.setItem('Userid',current_userid);

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //const [correctPassword, setCorrectPassword] = useState("");
  var correctPassword = "";
 
  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("ohfssofhosfhsifds");
    //alert('username ' + username + " password " + password);
    console.log(password);
    
    fetch("/api/checkuser?id=" + username)
    .then(response => response.json())
    .then(data => {
      correctPassword = data[0].password;
      checkPassword();
    });    
    }

    function checkPassword() {
      if(password == correctPassword) {
        fetch("/api/getuserid?id=" + username)
          .then(response => response.json())
          .then(data => {
            current_userid = data[0].userid;
            current_type = data[0].type;
                    localStorage.setItem('userid', current_userid);
                    localStorage.setItem('type', current_type);
                    localStorage.setItem('username', username);
                    window.location.href = "/home";
    });
      } else {
        alert('Wrong Password. Please try again.');
      }
    }; 

    
  return (
    <div className="Login">
        <img className="movie-page-img" src={logo}/>
        <h1>DesolateWave Movie List</h1>
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="username" bsSize="large">
          <ControlLabel>Username: </ControlLabel>
          <FormControl
            type="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </FormGroup>
        <br></br>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password: </ControlLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <br></br>
        <button className = "newb" disabled={!validateForm()} type="submit">
          Login
        </button>
        {" "}
        <Link to = '/newuser'><button className = "newb"> Register </button></Link>
      </form>
    </div>
  );
}
