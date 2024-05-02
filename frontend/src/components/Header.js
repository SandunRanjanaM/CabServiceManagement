import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from './logo.jpg';

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

    const handleLogout = () => {
        // Set isLoggedIn to false and remove it from localStorage
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
    };

    // Check if the user is logged in when the component mounts
    useEffect(() => {
        const storedLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (storedLoggedIn !== isLoggedIn) {
            setIsLoggedIn(storedLoggedIn);
        }
    }, []);

    return (
        <div>
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}>
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item" >
                                <Link to="/" className="nav-link active">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/add" className="nav-link active">Create System User</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/update" className="nav-link active">SystemUsers</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    More
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/salary/add">Calculate Salaries</Link></li>
                                    <li><a className="dropdown-item" href="/salary/update">Salaries</a></li>
                                    <li><hr className="dropdown-divider"></hr></li>
                                    <li><a className="dropdown-item" href="/analytics">System Analysis</a></li>
                                </ul>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <img src={logo} alt="logo" style={{ width: '50px', height: '50px', marginRight:"30px"}} />
                        </form>
                        {isLoggedIn && (
                            <a href="/" onClick={handleLogout} className="btn btn-danger">Logout</a>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;
