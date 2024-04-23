import React,{useState} from "react";
import { Link } from "react-router-dom";

function Header() {
  return (

    

    <ul className="nav nav-pills">
      <li className="nav-item">
      <Link to ="/home" className="nav-link">Home</Link>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/add">Add Package</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/view">View Form</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/select" aria-disabled="true">Package Counts</a>
      </li>
    </ul>


  );
}

export default Header;
