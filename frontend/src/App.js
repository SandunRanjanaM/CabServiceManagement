import React, { useEffect } from 'react'; 
import Header from './components/Header';
import AddTrip from './components/AddTrip';
import AllTrips from './components/AllTrips';
import Payment from './components/Payment';
import Report from './components/Report';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Update from './components/UpdateTrip';

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
            <Route path="/addTrip" element={<AddTrip />} />
            <Route path="/payment/:id" element={<Payment/>} />
            <Route path="/report" element={<Report/>} />
            <Route path="/update/:id" element={<Update />} />

          </Routes>
        </div>
      )}
    </Router>
  );
}

export default App;