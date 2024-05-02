import React from "react";
import "./AdminHome.css"; // Import the CSS file for styling
import { Link } from "react-router-dom";

const AdminHome = () => {
    return (
        <div className="admin-home">
            <div className="content">
                <div className="welcome-section">
                    <h2>Welcome, Administrator!</h2>
                    <p>Manage your system users, view analytics, and keep your system running smoothly.</p>
                </div>
                <div className="quick-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/update">Manage System Users</Link></li>
                        <li><Link to="/analytics">View Analytics</Link></li>
                        <li><Link to="/add">Add New System User</Link></li>
                    </ul>
                </div>
                <div className="stats-section">
                    <h3>System Statistics</h3>
                    <div className="stats-container">
                        <div className="stat-item">
                            <h4>Total Users</h4>
                            <p>120</p>
                        </div>
                        <div className="stat-item">
                            <h4>Active Sessions</h4>
                            <p>25</p>
                        </div>
                        <div className="stat-item">
                            <h4>Recent Activity</h4>
                            <p>Viewed user profile of John Doe</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
