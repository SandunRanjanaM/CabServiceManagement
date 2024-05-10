import React,{useState} from "react"
import Axios from "axios";
//import "../styles/AddTrip.module.css";
export default  function AddTrip(){

  const[fname, setFirstName]=useState("");
  const[lname, setLastName]=useState("");
  const[address, setAddress]=useState("");
  const[contactNo, setContactNo]=useState("");
  const[destination, setDestination]=useState("");
  const[vplaces, setVisitingPlaces]=useState("");
  const[passengers, setNumberOfPassengers]=useState("1");
  const[vehicletype, setVehicleType]=useState("");
  const[date, setDate]=useState("");
  const[time, setTime]=useState("");
  const [distance, setDistance] = useState("");
  //Error Statees
  const [fnameError, setFnameError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [contactNoError, setContactNoError] = useState('');
  const [destinationError, setDestinationError] = useState('');
  const [vplacesError, setVplacesError] = useState('');
  const [passengersError, setPassengersError] = useState('');
  const [vehicletypeError, setVehicletypeError] = useState('');
  const [timeError, setTimeError] = useState('');
  const [distanceError, setDistanceError] = useState('');

  
  const today =new Date();
  const currentDate =`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  function sendData(e){
      e.preventDefault();

      if(fname === ''){
        setFnameError('First name is required');
        return;
      }
      if (address === '') {
        setAddressError('Address is required');
        return;
      }
      if (contactNo === '' || !/^\d{10}$/.test(contactNo)) {
        setContactNoError('Contact number is required and should be 10 digits');
        return;
      }
      if (destination === '') {
        setDestinationError('Destination is required');
        return;
      }
      if (vplaces === '') {
        setVplacesError('Visiting places are required');
        return;
      }
      if (passengers === '') {
        setPassengersError('Number of passengers is required');
        return;
      }
      if (vehicletype === '') {
        setVehicletypeError('Vehicle type is required');
        return;
      }
      if (time === '') {
        setTimeError('Time is required');
        return;
      }
      if (distance === '') {
        setDistanceError('Distance is required');
        return;
      }

      const newTrip={
        Firstname: fname,
        Lastname: lname,
        Address: address,
        ContactNo: contactNo,
        Destination: destination,
        VisitingPlaces: vplaces,
        NumberOfPassengers: passengers,
        VehicleType: vehicletype,
        date: date,
        time: time,
        distance: distance
      }
      Axios.post("http://localhost:8070/trip/addTrip", newTrip).then(()=>{
        alert("Trip Added...")
        setFirstName("");
        setLastName("");
        setAddress("");
        setContactNo("");
        setDestination("");
        setVisitingPlaces("");
        setNumberOfPassengers("1");
        setVehicleType("");
        setDate("");
        setTime("");
        setDistance("");

      }).catch((err)=>{
        alert(err)
      })

    }


    return (
      <div className="container">
        <form onSubmit={sendData}>
          <div className="form-group">
            <label htmlFor="fname">First Name</label>
            <input
              type="text"
              className="form-control"
              id="fname"
              placeholder="Enter customer firstname"
              value={fname}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            {fnameError && <p> {fnameError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="lname">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lname"
              placeholder="Enter customer lastname"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="Enter customer address"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
           {addressError && <p> {addressError}</p>}

          </div>
          <div className="form-group">
            <label htmlFor="contactno">Contact No</label>
            <input
              type="tel"
              className="form-control"
              id="contactno"
              placeholder="Enter contact number"
              onChange={(e) => {
                setContactNo(e.target.value);
              }}
            />
             {contactNoError && <p> {contactNoError}</p>}

          </div>
          <div className="form-group">
            <label htmlFor="destination">Destination</label>
            <input
              type="text"
              className="form-control"
              id="destination"
              placeholder="Enter the destination"
              onChange={(e) => {
                setDestination(e.target.value);
              }}
            />
            {destinationError && <p> {destinationError}</p>}

          </div>
          <div className="form-group">
            <label htmlFor="vplaces">Visiting Places</label>
            <input
              type="text"
              className="form-control"
              id="vplaces"
              placeholder="Enter visiting places"
              onChange={(e) => {
                setVisitingPlaces(e.target.value);
              }}
            />
          {vplacesError && <p> {vplacesError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="passengers">NumberOfPassengers</label>
            <select
              className="form-control"
              id="passengers"
              value={passengers}
              onChange={(e) => {
                setNumberOfPassengers(e.target.value);
              }}
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
            {passengersError && <p> {passengersError}</p>}

          </div>
          <div className="form-group col-md-4">
            <label htmlFor="inputVehicleType">VehicleType</label>
            <select
              id="inputVehicleType"
              className="form-control"
              value={vehicletype}
              onChange={(e) => {
                setVehicleType(e.target.value);
              }}
            >
              <option value="">Choose...</option>
              <option value="Car">Car</option>
              <option value="MiniVan">MiniVan</option>
              <option value="van">van</option>
              <option value="KDH">KDH</option>
              <option value="Jeep">Jeep</option>
              <option value="Bus">Bus</option>
            </select>
            {vehicletypeError && <p> {vehicletypeError}</p>}

          </div>
          <div className="form-group">
            <label htmlFor="date"> Date</label>
            <input
              type="date"
              value={date}
              onChange={(e)=>setDate(e.target.value)} min={currentDate}
              className="form-control"
              id="dataepicker"
              placeholder="Select Date"
              />
          </div>
          <div className="form-group">
            <label htmlFor="time"> Time</label>
            <input
              type="time"
              className="form-control"
              id="timepicker"
              placeholder="Select Time"
              onChange={(e) => {
                setTime(e.target.value);
              }}
            />
           {timeError && <p> {timeError}</p>}
          </div>
          <div className="form-group">
          <label htmlFor="distance">Distance (in km)</label>
          <input
            type="text"
            className="form-control"
            id="distance"
            placeholder="Enter distance traveled"
            value={distance}
            onChange={(e) => {
              setDistance(e.target.value);
            }}
          />
          {distanceError && <p>{distanceError}</p>}
        </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
      </div>
    );
  }