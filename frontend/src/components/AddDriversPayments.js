import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AddDriversPayments() {

    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [amount, setAmount] = useState("");
    const [companycommission, setCompanycommission] = useState("");
    const [finalsalary, setFinalsalary] = useState("");
    //const [amountError, setAmountError] = useState(""); // Added amountError state

    function sendData(e) {
        e.preventDefault();

        // Validate amount input
        if (!/^\d+(\.\d{1,2})?$/.test(amount)) {
            alert("Please enter a valid number for the amount.");
            setAmount(""); // Clear the input field
            return;
        }
        
        const newDriverpayment = {
            name,
            date,
            amount,
            companycommission,
            finalsalary
        }

        axios.post("http://localhost:8070/driverpayments/add", newDriverpayment).then(() => {
            alert("Driver Payment Added Successfully")
            
            setName("");
            setDate("");
            setAmount("");
            setCompanycommission("");
            setFinalsalary("");
            //setAmountError(""); // Reset amountError on successful submission


        }).catch((err) => {
            alert(err)
        })

    }

    function calculateCommission() {
        //Get amount and get 20% amount from that 
        //and set that to companycommission
        const commission = amount * 0.2;
        setCompanycommission(commission);
    }

    function calculateFinalSalary() {
        //reduce company commission from the amount
        //set remaining amount to the finalsalary
        const salary = amount - companycommission
        setFinalsalary(salary);
    }


    return (
        <div className="container" style={{ width: '50%', margin: '0 auto' }}>
            <div className="p-3 mb-2 bg-secondary-subtle text-secondary-emphasis">
            <form onSubmit={sendData}>

            <p className="h1" style={{ textAlign: 'center' }}>Calculate Driver Payment</p>
            <hr></hr>
            
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" placeholder="Enter name" 
                value={name}
                onChange={(e) => setName(e.target.value)}>
                </input>
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