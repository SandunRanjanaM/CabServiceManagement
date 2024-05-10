import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import "../styles/AllTripsStyle.css";
import Payment from './Payment';
import Report from './Report';

export default function AllTrips() {
  const [trips, setTrips] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await Axios.get('http://localhost:8070/trip/');
      setTrips(response.data);
    } catch (error) {
      console.error('Error fetching trips:', error);
    }
  };

  const filterTrips = () => {
    const filtered = trips.filter((trip) => {
      return (
        trip.Firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trip.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trip.Address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trip.Destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trip.VehicleType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredTrips(filtered);
  };

  useEffect(() => {
    filterTrips();
  }, [searchTerm, trips]);

  const deleteTrip = async (id) => {
    try {
      await Axios.delete(`http://localhost:8070/trip/delete/${id}`);
      alert('Trip deleted Successfully');
      fetchTrips(); // Fetch trips again after deleting
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSelectTrip = (trip) => {
    setSelectedTrip(trip);
  };

  const generateReport = async () => {
    try {
      const response = await Axios.get('http://localhost:8070/trip/');
      setTrips(response.data);
      setShowReport(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleUpdateTrip = (updatedTrip) => {
    // Update the state with the modified trip data
    setTrips((prevTrips) =>
      prevTrips.map((trip) => (trip._id === updatedTrip._id ? updatedTrip : trip))
    );
  };

  return (
    
      <div className="container2">
      <h1>AllTrips</h1>
      <div className='sBar'>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <button onClick={filterTrips}>Search</button>

    </div>
      <br></br>

      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Contact No.</th>
            <th>Destination</th>
            <th>Visiting <br></br>Places</th>
            <th>Number Of <br></br>Passengers</th>
            <th>Vehicle Type</th>
            <th>Date</th>
            <th>Time</th>
            <th>distance</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTrips.map((trip) => (
            <tr key={trip._id}>
              <td>{trip.Firstname}</td>
              <td>{trip.Lastname}</td>
              <td>{trip.Address}</td>
              <td>{trip.ContactNo}</td>
              <td>{trip.Destination}</td>
              <td>{trip.VisitingPlaces}</td>
              <td>{trip.NumberOfPassengers}</td>
              <td>{trip.VehicleType}</td>
              <td>{trip.date}</td>
              <td>{trip.time}</td>
              <td>{trip.distance}</td>

              <td>
                <div className='actionTop'>
                <button onClick={() => deleteTrip(trip._id)} className="btn btn-danger">
                  Delete
                </button>
                <Link to={`/update/${trip._id}`} state={trip} className="btn btn-warning">
                  Update
                </Link>
                
                <Link to={`/payment/${trip._id}`} className="btn btn-primary pButon">
                  Payment
                </Link>
                </div>
                <div className='actionBottom'>
                <button onClick={generateReport} className="generateReport">Generate Report</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedTrip && <Payment trip={selectedTrip} />}
      {showReport && <Report trips={trips} />}
      {selectedTrip && <Report trips={[selectedTrip]} />}
    </div>
  );
}
