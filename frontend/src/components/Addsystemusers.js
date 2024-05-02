import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Login.css'; 

export default function AddSystemUsers() {
    const [Emp_ID, setEmp_ID] = useState("");
    const [name, setname] = useState("");
    const [password, setpassword] = useState("");
    const [phone_number, setphone_number] = useState("");
    const [address, setaddress] = useState("");
    const [Emp_Type, setEmp_Type] = useState("");
    const [existingUsers, setExistingUsers] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8070/systemusers/")
            .then((res) => {
                setExistingUsers(res.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value;
        // Validation: Allow only numbers and limit input to 10 digits
        const formattedValue = value.replace(/\D/g, '').slice(0, 10);
        setphone_number(formattedValue);
    };

    function sendData(e){
        e.preventDefault();

        // Check if Emp_ID already exists
        if (existingUsers.some(user => user.Emp_ID === Emp_ID)) {
            alert("Employee ID already exists. Please choose a different ID.");
            return;
        }

        const newSystemUser = {
            Emp_ID,
            name,
            password,
            phone_number,
            address,
            Emp_Type
        }

        axios.post("http://localhost:8070/systemusers/add", newSystemUser).then(()=>{
            alert("System user Added");
            setEmp_ID("");
            setEmp_Type("");
            setaddress("");
            setname("");
            setpassword("");
            setphone_number("");
            window.location.href = "/update";
        }).catch((err)=>{
            alert(err)
        })
    }

    return (
        <div className="login-container-2">
            <div style={{textAlign:"center"}}>
            <h3>Add New System User</h3>
            </div>
            <div className="container">
                <form onSubmit={sendData} className="login-form">
                    <div className="form-group">
                        <label htmlFor="Emp_ID">Employee ID</label>
                        <input type="text" className="form-control" id="Emp_ID" placeholder="Enter Employee ID" required onChange={(e) => { setEmp_ID(e.target.value); }}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Employee Name</label>
                        <input type="text" className="form-control" id="name" placeholder="Enter Employee Name" required onChange={(e) => { setname(e.target.value); }}/> 
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Employee Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Enter Employee Password, 'Use Strong Password'" required onChange={(e) => { setpassword(e.target.value); }}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone_number">Employee Phone Number</label>
                        <input type="tel" className="form-control" id="phone_number" value={phone_number} onChange={handlePhoneNumberChange} pattern="[0-9]{10}" title="Please enter a 10-digit phone number" required placeholder="Enter Phone number 'Only 10 numbers'"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Employee Address</label>
                        <input type="text" className="form-control" id="address" placeholder="Enter Employee Permanent Address'" required onChange={(e) => { setaddress(e.target.value); }}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="Emp_Type">Employee Type</label>
                        <select className="form-select" aria-label="Default select example" onClick={(e) => { setEmp_Type(e.target.value); }} required >
                            <option disabled selected style={{color: "#999"}}>Select user role</option>
                            <option value="Payment_Manager">Payment Manager</option>
                            <option value="Administrator">Administrator</option>
                            <option value="Inquiry_Manager">Inquiry Manager</option>
                            <option value="Package_Manager">Package Manager</option>
                            <option value="Inventory_Manager">Inventory Manager</option>
                            <option value="Advertisement_Manager">Advertisement Manager</option>
                            <option value="Trip_Order_Manager">Trip Order Manager</option>
                            <option value="User_Manager">User Manager</option>
                        </select>
                    </div>

                    <div className="form-group" style={{textAlign:"center"}}>
                        <button type="submit" className="btn btn-primary">
                            Add System User
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
