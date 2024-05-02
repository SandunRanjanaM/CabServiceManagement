import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Login.css'; // Import the CSS file

const Login = ({ onLoginSuccess }) => {
    const [userId, setUserId] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [error, setError] = useState("");
    const [systemUsers, setSystemUsers] = useState([]);
    
    // Fetch system users data from the database
    useEffect(() => {
        axios.get("http://localhost:8070/systemusers")
            .then(response => {
                setSystemUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        
        // Find the user with the entered employee ID
        const user = systemUsers.find(user => user.Emp_ID === userId);
        
        if (!user) {
            setError("Invalid User ID");
            return;
        }

        // Check if the entered password matches the user's password
        if (user.password !== userPassword) {
            setError("Incorrect Password");
            return;
        }
        
        // Redirect based on user type
        switch (user.Emp_Type) {
            case "Administrator":
                onLoginSuccess("/");
                break;
            case "Manager":
                onLoginSuccess();
                break;
            case "User":
                onLoginSuccess();
                break;
            default:
                setError("Invalid User Type");
        }
    };

    return (
        <div className="login-container">
            <h2 style={{textAlign:"center"}}>Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>User ID:</label>
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
