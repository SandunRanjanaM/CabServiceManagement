import React from "react";
import {Link} from "react-router-dom"

function Header() {

    return (

        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/add" className="nav-link">Create Ads</Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/manage" className="nav-link">Manage Ads</Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/statistic" className="nav-link">Admin Statistic</Link>
                    </li>
                </ul>
                </div>
            </div>
            </nav>
        </div>
    )
}

export default Header;