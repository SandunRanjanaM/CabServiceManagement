// Update.js

// Update.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Update() {
  const { id } = useParams(); // Get the id parameter from the URL
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const [drivingExperience, setDrivingExperience] = useState("");
  const [licenseYear, setLicenseYear] = useState("");

  useEffect(() => {
    // Fetch user details based on id
    axios
      .get(`http://localhost:8070/Customer/${id}`)
      .then((response) => {
        const userData = response.data;
        setName(userData.name);
        setAge(userData.age);
        setAddress(userData.address);
        setPassword(userData.password);
        setType(userData.type);
        setDrivingExperience(userData.drivingExperience);
        setLicenseYear(userData.licenseYear);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [id]); // Run once when component mounts or id changes

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedUser = {
      name,
      age,
      address,
      password,
      type,
      drivingExperience,
      licenseYear,
    };
    axios
      .put(`http://localhost:8070/Customer/update/${id}`, updatedUser)
      .then(() => {
        alert("User details updated");
      })
      .catch((error) => {
        console.error("Error updating user details:", error);
      });
  };


  return (
    <div className="container">
      <form onSubmit={sendData} className="border p-4">
        <div className="mb-3">
          <label htmlFor="nameInput" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="nameInput"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ageInput" className="form-label">
            Age
          </label>
          <input
            type="number"
            className="form-control"
            id="ageInput"
            placeholder="Enter age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            placeholder="Enter email"
            value={Address}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="passwordInput"
            placeholder="Enter password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="typeSelect" className="form-label">
            Type
          </label>
          <select
            className="form-select"
            id="typeSelect"
            value={type}
            onChange={handleTypeChange}
          >
            <option value="Customer">Customer</option>
            <option value="Driver">Driver</option>
          </select>
        </div>
        {type === "Driver" && (
          <div>
            <div className="mb-3">
              <label htmlFor="drivingExperienceInput" className="form-label">
                Driving Experience
              </label>
              <textarea
                type="text"
                className="form-control"
                id="drivingExperienceInput"
                placeholder="Type your driving experience"
                value={drivingExperiance}
                onChange={(e) => setDrivingExperience(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="licenseYearInput" className="form-label">
                Year of License
              </label>
              <input
                type="number"
                className="form-control"
                id="licenseYearInput"
                placeholder="Enter license year"
                value={liscenceYear}
                onChange={(e) => setLicenseYear(e.target.value)}
              />
            </div>
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
