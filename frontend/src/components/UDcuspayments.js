import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function UDcuspayments() {
    const [paymentdetails, setPaymentDetails] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3000/paymentdetails/get/${id}`)
            .then((response) => {
                setPaymentDetails(response.data.paydetail);
                console.log(response);
            })
            .catch((err) => {
                console.error("Error fetching user details", err.response);
            });
    }, [id]);

    return (
        <div className="container">
            <h1>User Profile</h1>
            {paymentdetails ? (
                <div>
                    <div><strong>Name:</strong> {paymentdetails.name}</div>
                    <div><strong>Date:</strong> {paymentdetails.date}</div>
                    <div><strong>Payment Type:</strong> {paymentdetails.paymentType}</div>
                    <div><strong>Amount:</strong> {paymentdetails.amount}</div>
                    <div><strong>Payment Description:</strong> {paymentdetails.paymentDescription}</div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}
