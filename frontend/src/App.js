import React, { useEffect } from 'react'; 
import Header from './components/Header';
import AddTrip from './components/AddTrip';
import AllTrips from './components/AllTrips';
import Login from './components/Login';
import Register from './components/Register';
import Payment from './components/Payment';
import Report from './components/Report';
import HomePage from './components/HomePage';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Update from './components/Update';

function App() {
  const {loading}=useSelector((state)=>state.alerts);

  useEffect(() => {
    fetch('http://localhost:8070/trip/')
      .then((response) => response.json())
      .catch((error) => console.error('Error fetching trips:', error));
  }, []);

  return (
    <Router>
      {loading ? (
        null
      ) : (
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<AllTrips />} />
            <Route path="/add" element={<AddTrip />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />          
            <Route path="/payment/:id" element={<Payment/>} />
            <Route path="/report" element={<Report/>} />
            <Route path="/update/:id" element={<Update />} />
            <Route path="/homepage" element={<HomePage/>} ></Route>
          </Routes>
        </div>
      )}
    </Router>
  );
}

export default App;