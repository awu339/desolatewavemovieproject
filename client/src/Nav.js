import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function Nav() {

    const navStyle = {
        color: 'white'
    };

  return (
    <nav>
        <u1 className="navlinks">
        <Link style={navStyle} to='/home'>
            <li>Home</li>
        </Link>
        <Link style={navStyle} to='/movies'>
            <li>Movies</li>
        </Link>
        <Link style={navStyle} to='/favorites'>
            <li>Favorites</li>
        </Link>
        <Link style={navStyle} to='/profile'>
            <li>Profile</li>
        </Link>
        <Link style={navStyle} to='/search'>
            <li>Search</li>
        </Link>
        <Link style={navStyle} to='/friends'>
            <li>Friends</li>
        </Link>
       {/*  <Link style={navStyle} to='/newuser'>
            <li>New User</li>
        </Link> */}
        <Link style ={navStyle} to = '/'>
            <li>Logout</li> 
        </Link>
        </u1>
    </nav>
        
  );
}

export default Nav;
