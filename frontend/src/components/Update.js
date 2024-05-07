import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import "../styles/UpdateStyle.css";
import Axios from 'axios';

function Update() {
  const{id}=useParams();
  const location = useLocation();
  const [values,setValues]=useState({
    fname:'',
    lname:'',
    address:'',
    contactno:'',
    destination:'',
    vplaces:'',
    passengers:'1',
    vehicletype:'',
    date:'',
    time:'',
    distance:''
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        let tripData = {};
        if (location.state) {
          tripData = location.state; 
        } else {
          const response = await Axios.get(`http://localhost:8070/trip/get/${id}`);
          tripData = response.data.trip;
        }
        setValues(prevValues => ({
          ...prevValues,
          fname: tripData.Firstname ,
          lname: tripData.Lastname ,
          address: tripData.Address ,
          contactno: tripData.ContactNo ,
          destination: tripData.Destination ,
          vplaces: tripData.VisitingPlaces ,
          passengers: tripData.NumberOfPassengers ,
          vehicletype: tripData.VehicleType ,
          date: tripData.date ,
          time: tripData.time ,
          distance: tripData.distance,
        }));
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, [id,  location.state]);
  

const handleUpdate=async()=>{
  try{
    await Axios.put(`http://localhost:8070/trip/update/${id}`, values);
    window.location.href='/';
  }catch(error){
    throw(new Error(error));
    console.log(error)
  }
}

  return (
    <form className='form'>
    <div className="container4">
          <div className="form-group">
            <label htmlFor="fname">First Name</label>
            <input
              type="text"
              className="form-control"
              id="fname"
              placeholder="Enter customer firstname"
              value={values.fname}
              onChange={(e) => setValues({...values, fname: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lname">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lname"
              placeholder="Enter customer lastname"
              value={values.lname}
              onChange={(e) => setValues({...values, lname: e.target.value})}


             
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="Enter customer address"
              value={values.address}
              onChange={(e) => setValues({...values, address: e.target.value})}

            />

          </div>
          <div className="form-group">
            <label htmlFor="contactno">Contact No</label>
            <input
              type="tel"
              className="form-control"
              id="contactno"
              placeholder="Enter contact number"
              value={values.contactno}
              onChange={(e) => setValues({...values, contactno: e.target.value})}


            />

          </div>
          <div className="form-group">
            <label htmlFor="destination">Destination</label>
            <input
              type="text"
              className="form-control"
              id="destination"
              placeholder="Enter the destination"
              value={values.destination}
              onChange={(e) => setValues({...values, destination: e.target.value})}

            />

          </div>
          <div className="form-group">
            <label htmlFor="vplaces">Visiting Places</label>
            <input
              type="text"
              className="form-control"
              id="vplaces"
              placeholder="Enter visiting places"
              value={values.vplaces}
              onChange={(e) => setValues({...values, vplaces: e.target.value})}

            />
          </div>
          <div className="form-group">
            <label htmlFor="passengers">NumberOfPassengers</label>
            <select
              className="form-control"
              id="passengers"
              value={values.passengers}      
              onChange={(e) => setValues({...values, passengers: e.target.value})}

          >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
            </select>

          </div>
          <div className="form-group col-md-4 new">
            <label htmlFor="inputVehicleType">VehicleType</label>
            <select
              id="inputVehicleType"
              className="form-control"
              value={values.vehicletype}        
              onChange={(e) => setValues({...values, vehicletype: e.target.value})}
      
            >
              <option value="">Choose...</option>
              <option value="Car">Car</option>
              <option value="MiniVan">MiniVan</option>
              <option value="van">van</option>
              <option value="KDH">KDH</option>
              <option value="Jeep">Jeep</option>
              <option value="Bus">Bus</option>
            </select>

          </div>
          <div className="form-group">
            <label htmlFor="date"> Date</label>
            <input
              type="date"
              value={values.date}
              className="form-control"
              id="dataepicker"
              placeholder="Select Date"
              onChange={(e) => setValues({...values, date: e.target.value})}

              />
          </div>
          <div className="form-group">
            <label htmlFor="time"> Time</label>
            <input
              type="time"
              className="form-control"
              id="timepicker"
              placeholder="Select Time"
              value={values.time}
              onChange={(e) => setValues({...values, time: e.target.value})}


              
            />
          </div>
          <div className="form-group">
          <label htmlFor="distance">Distance (in km)</label>
          <input
            type="text"
            className="form-control"
            id="distance"
            placeholder="Enter distance traveled"
            value={values.distance}            
            onChange={(e) => setValues({...values, distance: e.target.value})}

          />
        </div>

        <div className='uButton'>
        <button type="button" className="btn btn-primary" onClick={handleUpdate}>
        Update
      </button>
        </div>
          </div>
          </form>
  )
}
export default Update;
