import React from "react";
import {Link} from "react-router-dom";
function Header(){
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/" style={{ color: "red" }}>
          Deepthi Travels
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/homepage" className="nav-link">
                HomePage
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                AllTrips
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/add" className="nav-link">
                Add trips
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
}

export default Header;