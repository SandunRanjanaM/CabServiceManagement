import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function AddPaymentDetails() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [paymentType, setPaymentType] = useState("");
    const [amount, setAmount] = useState("");
    const [paymentDescription, setPaymentDescription] = useState("");

    function isDateValid(inputDate) {
        const currentDate = new Date();
        const selectedDate = new Date(inputDate);
    
        // Check if the selected date is today's date
        return selectedDate.toDateString() === currentDate.toDateString();
    }
    
    function sendData(e) {
        e.preventDefault();

        if (!isDateValid(date)) {
            alert("Please enter a valid date");
            return;
        }
        
        const newPayment = {
            name,
            date,
            paymentType,
            amount,
            paymentDescription
        }

        axios.post("http://localhost:8070/paymentdetails/addpaydetails", newPayment)
            .then((response) => {
                alert("Payment Detail Added Successfully");
                console.log('Response:', response);
                console.log('User ID:', response.data.userId);
                setName("");
                setDate("");
                setPaymentType("");
                setAmount("");
                setPaymentDescription("");
                navigate(`/udcuspayments/${response.data.userId}`);
 
            })
            .catch((err) => {
                alert(err);
            });
    }
    
    return (
        <div className="container" style={{ width: '50%', margin: '0 auto' }}>
            <div className="p-3 mb-2 bg-secondary-subtle text-secondary-emphasis">
                <form onSubmit={sendData}>
                    <div className="container" style={{ textAlign: 'center', color:'black' }}>
                        <p className="h1">Add Payment Details</p>
                    </div>
                    <hr />
                    
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" placeholder="Enter name" 
                            value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="date" className="form-label">Date</label>
                        <input type="date" className="form-control" id="date" placeholder="Enter date" 
                            value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="paymentType" className="form-label">Payment Type</label>
                        <input type="text" className="form-control" id="paymentType" placeholder="Enter payment type" 
                            value={paymentType} onChange={(e) => setPaymentType(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="amount" className="form-label">Amount</label>
                        <input type="number" className="form-control" id="amount" placeholder="Enter Amount" 
                            value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="paymentDescription" className="form-label">Payment Description</label>
                        <input type="text" className="form-control" id="paymentDescription" placeholder="Enter payment description" 
                            value={paymentDescription} onChange={(e) => setPaymentDescription(e.target.value)} />
                    </div>
                    
                    <div className="d-grid gap-2 col-6 mx-auto">
                        <button type="submit" className="btn btn-outline-success">Submit</button>
                        <button type="reset" className="btn btn-outline-warning">Reset</button>
                    </div>
                    
                    
                </form>
            </div>
        </div>
    );
}
