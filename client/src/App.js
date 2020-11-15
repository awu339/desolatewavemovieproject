import React, { useState, useEffect, Component } from 'react';
import './App.css';
import Axios from 'axios';
import Nav from './Nav';
import Home from './Home';
import Favorites from './Favorites';
import Movies from './Movies';
import Profile from './Profile';
import Search from './Search';
import Newuser from './Newuser';
import MoviePage from './MoviePage';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './Login';
import Friends from './Friends';
import FriendPage from './FriendPage';
import Reports from './Reports';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
          <Switch>
            <Route path="/" exact component={Login}/>
            <Route path="/favorites" component={Favorites}/>
            <Route path="/movies" component={Movies}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/search" component={Search}/>
            <Route path="/newuser" component={Newuser}/>
            <Route path="/moviepage" component={MoviePage}/>
            <Route path ="/home" component ={Home}/>
            <Route path ="/friends" component ={Friends}/>
            <Route path ="/friendpage" component ={FriendPage}/>
            <Route path ="/reports" component ={Reports}/>
          </Switch>
      </div>
    </Router>

  );
}

export default App;

