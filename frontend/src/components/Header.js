//Header.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar'; // Import the SearchBar component
import '../styles/Header.css'; // Make sure to adjust the path as needed

function Header() {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
       
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <i id="menu-icon" className="bx bx-menu"></i>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add">Add Inventory</Link>
            </li>
           
            <li className="nav-item">
              <Link className="nav-link" to="/parts">Parts</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">My Cart</Link>
            </li>
            
           
          </ul>
          {location.pathname === '/home' && <SearchBar />} {/* Conditionally render SearchBar only on the Home page */}
        </div>
      </div>
    </nav>
  );
}

export default Header;


 