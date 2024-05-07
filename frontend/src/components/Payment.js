import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom'; 
import "../styles/PaymentStyle.css";

export default function Payment() {
  const [trip, setTrip] = useState(null); // State to hold trip details
  const [loading, setLoading] = useState(true); // State to manage loading status
  const { id } = useParams(); // Retrieve trip ID from route parameters

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const response = await Axios.get(`http://localhost:8070/trip/get/${id}`); // Fetch trip details using ID
        console.log('Trip details:', response.data);
        setTrip(response.data); // Set trip details in state
        setLoading(false); // Update loading status
      } catch (error) {
        console.error('Error fetching trip details:', error);
      }
    };

    fetchTripDetails(); // Call the function to fetch trip details
  }, [id]); // Include id in dependency array

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!trip) {
    return null;
  }

  const {FirstName, Destination, Address, VehicleType, distance} = trip;

  let ratePerKm = 0;
  if (VehicleType === "Car") {
    ratePerKm = 100;
  } else {
    ratePerKm = 150;
  }
  const PaymentAmount = distance * ratePerKm;

  return (
    <div className="container3">
      <h1 className="text-center mt-5 mb-4">Payment Details</h1>
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h5 className="card-title mb-0">Trip Details</h5>
        </div>
        <div className="card-body">
          <p className="card-text">First Name: {FirstName}</p>
          <p className="card-text">Destination: {Destination}</p>
          <p className="card-text">Address: {Address}</p>
          <p className="card-text">Vehicle Type: {VehicleType}</p>
        </div>
      </div>
      <div className="card mt-3">
        <div className="card-header bg-success text-white">
          <h5 className="card-title mb-0">Payment Information</h5>
        </div>
        <div className="card-body">
          <p className="card-text">Payment Amount: Rs.{PaymentAmount}</p>
          <p className="card-text">Distance Traveled: {distance} km</p>
        </div>
      </div>
    </div>
  );
}