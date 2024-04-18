import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export default function AddPaymentDetails() {

    const [paymentType, setPaymentType] = useState("");
    const [amount, setAmount] = useState("");
    const [paymentDescription, setPaymentDescription] = useState("");

    function sendData(e) {
        e.preventDefault();
        
        const newPayment = {
            paymentType,
            amount,
            paymentDescription
        }

        axios.post("http://localhost:8070/paymentdetails/add", newPayment).then(() => {
            alert("Student Added")
            
            setPaymentType("");
            setAmount("");
            setPaymentDescription("");


        }).catch((err) => {
            alert(err)
        })

    }

    return (

        <div className="container">
            <form onSubmit={sendData}>

                <legend>Enter Payment Details</legend>

            <div className="mb-3">
                <label for="paymentType" className="form-label">Payment Type</label>
                <input type="text" className="form-control" id="paymentType" placeholder="Enter payment type" 
                onChange={(e) => {

                    setPaymentType(e.target.value);

                }}>
                </input>
            </div>

            <div className="mb-3">
                <label for="amount" className="form-label">Amount</label>
                <input type="number" className="form-control" id="amount" placeholder="Enter Amount" 
                onChange={(e) => {

                    setAmount(e.target.value);

                }}></input>
            </div>

            <div className="mb-3">
                <label for="paymentDescription" className="form-label">Payment Description</label>
                <input type="text" className="form-control" id="paymentDescription" placeholder="Enter payment description" 
                onChange={(e) => {

                    setPaymentDescription(e.target.value);

                }}></input>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>

            <Link to="/all" className="btn btn-primary">All Payment Details</Link>
            </form>
        </div>
        
    )
}
