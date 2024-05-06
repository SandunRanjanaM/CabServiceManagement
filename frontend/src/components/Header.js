import React from "react";
import { Link } from "react-router-dom"; 
import logo from './logo.png';

function Header() {

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}>
            
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Payment Mangement</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/home">Home</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Profile</a></li>
                  <li><Link to="/payments" className="dropdown-item">Payments</Link></li>
                  <li><Link to="/reports" className="dropdown-item">Reports</Link></li>

                  <li><hr className="dropdown-divider"></hr></li>
                  <li><a className="dropdown-item" href="#">Settings</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">Deepthi Travels</a>
              </li>
            </ul>
            <img src={logo} alt="logo" style={{ width: '100px', height: 'auto' }} />
          </div>
        </div>

      </nav>

      
      

    
    )
}

export default Header;