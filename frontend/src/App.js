import './App.css';
import React, { useState, useEffect } from "react";
import Allsystemusers from './components/AllsystemUsers';
import Addsystemusers from './components/Addsystemusers';
import Header from './components/Header';
import Login from './components/login';
import AdminHome from './components/AdminHome';
import AddSalary from './components/AddSalary';
import AllSalaries from './components/AllSalaries';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Analysis from './components/Analysis';


function App() {
  // Initialize isLoggedIn state with the value from localStorage or false if not present
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  const handleLoginSuccess = () => {
    // Set isLoggedIn to true and save it to localStorage
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

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
    <Router>
      <div>
        {!isLoggedIn && <Login onLoginSuccess={handleLoginSuccess} />}
        
        {isLoggedIn && (
          <>
            <Header />
            <Routes>
              <Route path="/" element={<AdminHome />} />
              <Route path="/add" element={<Addsystemusers />} />
              <Route path="/update" element={<Allsystemusers />} />
              <Route path="/salary/add" element={<AddSalary/>}/>
              <Route path="/salary/update" element={<AllSalaries/>}/>
              <Route path="/analytics" element={<Analysis/>}/>
            </Routes>
            
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
