import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import logo from './cinema.png';

function Nav() {
    const type = localStorage.getItem('type');
    const navStyle = {
        color: 'white',
        fontWeight: 'bold',
        textDecoration: 'none',
        background: 'gray',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        padding: '10px',
        borderRadius: '5px'
    };

    if(type === 'admin'){
        return (
            <nav>
                <Link to={{ 
                  pathname: "/Home"}}> 
                  <img className="logo-img" src={logo}/>
                </Link>
                <u1 className="navlinks">
                <Link style={navStyle} to='/home'>
                    <li>Home</li>
                </Link>
                <Link style={navStyle} to='/search'>
                    <li>Search</li>
                </Link>
                <Link style={navStyle} to='/favorites'>
                    <li>Favorites</li>
                </Link>
                <Link style={navStyle} to='/profile'>
                    <li>Reviews</li>
                </Link>
                <Link style={navStyle} to='/friends'>
                    <li>Friends</li>
                </Link>
                <Link style={navStyle} to='/reports'>
                    <li>Reports</li>
                </Link> 
                <Link style ={navStyle} to = '/'>
                    <li>Logout</li> 
                </Link>
                </u1>
                <br />
            </nav>
          );
    }
    else{
        return (
    
            <nav>
                <Link to={{ 
                  pathname: "/Home"}}> 
                  <img className="logo-img" src={logo}/>
                </Link>
                <u1 className="navlinks">
                <Link style={navStyle} to='/home'>
                    <li>Home</li>
                </Link>
                <Link style={navStyle} to='/search'>
                    <li>Search</li>
                </Link>
                <Link style={navStyle} to='/favorites'>
                    <li>Favorites</li>
                </Link>
                <Link style={navStyle} to='/profile'>
                    <li>Reviews</li>
                </Link>
                <Link style={navStyle} to='/friends'>
                    <li>Friends</li>
                </Link>
                <Link style ={navStyle} to = '/'>
                    <li>Logout</li> 
                </Link>
                </u1>
            </nav>   
          );
    }
}

export default Nav;
