import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router

function Header() {

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <img src="frontend\public\logo192.png" class="img-thumbnail" alt="logo"></img>
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Payment Mangement</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/Header">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Profile</a></li>
                  <li><Link to="/payments" className="dropdown-item">Payments</Link></li>
                  <li><Link to="/addreports" className="dropdown-item">Reports</Link></li>

                  <li><hr className="dropdown-divider"></hr></li>
                  <li><a className="dropdown-item" href="#">Settings</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">Deepthi Travels</a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    )
}

export default Header;