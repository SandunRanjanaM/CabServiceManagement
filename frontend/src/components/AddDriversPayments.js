import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AddDriversPayments() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState("");
    const [amount, setAmount] = useState("");
    const [companycommission, setCompanycommission] = useState("");
    const [finalsalary, setFinalsalary] = useState("");
    const [emailError, setEmailError] = useState(""); 

    // Email validation 
    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    // Dste validation
    function isDateValid(inputDate) {
        const currentDate = new Date();
        const selectedDate = new Date(inputDate);
    
        return selectedDate.toDateString() === currentDate.toDateString();
    }

    function sendData(e) {
        e.preventDefault();

        // Email validation
        if (!validateEmail(email)) {
            setEmailError("Please enter a valid email address.");
            return;
        } else {
            setEmailError(""); 
        }

        // Date validation
        if (!isDateValid(date)) {
            alert("Please enter the valid date");
            return;
        }

        // Amount validation
        if (!/^\d+(\.\d{1,2})?$/.test(amount)) {
            alert("Please enter a valid number for the amount.");
            setAmount(""); 
            return;
        }

        const newDriverpayment = {
            name,
            email,
            date,
            amount,
            companycommission,
            finalsalary
        }

        axios.post("http://localhost:8070/driverpayments/add", newDriverpayment).then(() => {
            alert("Driver Payment Added Successfully")

            setName("");
            setEmail("");
            setDate("");
            setAmount("");
            setCompanycommission("");
            setFinalsalary("");

        }).catch((err) => {
            alert(err)
        })

    }

    function calculateCommission() {
        const commission = amount * 0.2;
        setCompanycommission(commission);
    }

    function calculateFinalSalary() {
        const salary = amount - companycommission
        setFinalsalary(salary);
    }

    return (
        <div className="container" style={{ width: '50%', margin: '0 auto' }}>
            <div className="p-3 mb-2 bg-secondary-subtle text-secondary-emphasis">
                <form onSubmit={sendData}>

                <div className="container" style={{ textAlign: 'center', color:'black' }}>
                <p class="h1">Calculate Driver Payment</p>
                </div>
                    <hr></hr>

                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}>
                        </input>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}>
                        </input>
                        {emailError && <div className="text-danger">{emailError}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="date" className="form-label">Date</label>
                        <input type="date" className="form-control" id="date" placeholder="Enter date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}>
                        </input>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="amount" className="form-label">Amount</label>
                        <input type="text" className="form-control" id="amount" placeholder="Enter Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}></input>
                    </div>

                    <button type="button" className="btn btn-outline-warning" onClick={calculateCommission}>Calculate Commission</button>

                    <div className="mb-3">
                        <label htmlFor="companycommission" className="form-label">Company Commission</label>
                        <input type="number" className="form-control" id="companycommission" placeholder="Company Commission"
                            value={companycommission}
                            onChange={(e) => setCompanycommission(e.target.value)}></input>
                    </div>

                    <button type="button" className="btn btn-outline-warning" onClick={calculateFinalSalary}>Calculate Final Salary</button>

                    <div className="mb-3">
                        <label htmlFor="finalsalary" className="form-label">Final Salary</label>
                        <input type="number" className="form-control" id="finalsalary" placeholder="Final Salary"
                            value={finalsalary}
                            onChange={(e) => setFinalsalary(e.target.value)}></input>
                    </div>
                    <div className="d-grid gap-2 col-6 mx-auto" style={{ textAlign: 'center' }}>
                        <button type="submit" className="btn btn-outline-success">Submit</button>
                        <Link to="/alldriverpayments" className="btn btn-secondary">All Driver Payments</Link>
                    </div>

                </form>
            </div>
        </div>
    )
}
