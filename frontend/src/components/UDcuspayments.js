import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UDcuspayments({ match }) {
    const [paymentDetails, setPaymentDetails] = useState({});

    useEffect(() => {
        const userId = match.params.id;
        axios.get(`http://localhost:8070/paymentdetails/get/${userId}`)
            .then(response => {
                setPaymentDetails(response.data.payment);
            })
            .catch(error => {
                console.error("Error fetching payment details:", error);
            });
    }, [match.params.id]);

    return (
        <div className="container" style={{ width: '50%', margin: '0 auto' }}>
            <div className="p-3 mb-2 bg-secondary-subtle text-secondary-emphasis">
                <p className="h1" style={{ textAlign: 'center' }}>Your Payment Details</p>
                <hr></hr>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" value={paymentDetails.name || ""} readOnly />
                </div>

                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input type="date" className="form-control" id="date" value={paymentDetails.date || ""} readOnly />
                </div>

                <div className="mb-3">
                    <label htmlFor="paymentType" className="form-label">Payment Type</label>
                    <input type="text" className="form-control" id="paymentType" value={paymentDetails.paymentType || ""} readOnly />
                </div>

                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">Amount</label>
                    <input type="number" className="form-control" id="amount" value={paymentDetails.amount || ""} readOnly />
                </div>

                <div className="mb-3">
                    <label htmlFor="paymentDescription" className="form-label">Payment Description</label>
                    <input type="text" className="form-control" id="paymentDescription" value={paymentDetails.paymentDescription || ""} readOnly />
                </div>

                <div className="d-grid gap-2 col-6 mx-auto">
                    <button type="button" className="btn btn-primary" onClick={() => window.history.back()}>Back</button>
                </div>
            </div>
        </div>
    )
}
