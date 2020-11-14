import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import logo from './cinema.png';

function Nav() {
    const type = localStorage.getItem('type');
    const navStyle = {
        color: 'white'
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
                <Link style={navStyle} to='/movies'>
                    <li>Movies</li>
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
                <Link style={navStyle} to='/movies'>
                    <li>Movies</li>
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
