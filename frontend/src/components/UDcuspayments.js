import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function UDcuspayments() {
    const { id } = useParams(); // Extract the id parameter from the route
    const [paymentDetails, setPaymentDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!id) {
                    throw new Error("User ID not provided");
                }

                const response = await axios.get(`http://localhost:8070/paymentdetails/get/${id}`);
                setPaymentDetails(response.data.payment);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching payment details:", error);
                setError(error.message || "Error fetching payment details");
                setLoading(false);
            }
        };

        fetchData();
    }, [id]); // Include id in the dependency array

    return (
        <div className="container" style={{ width: '50%', margin: '0 auto' }}>
            <div className="p-3 mb-2 bg-secondary-subtle text-secondary-emphasis">
                <div className="container" style={{ textAlign: 'center', color: 'black' }}>
                    <p className="h1">Customer Payment Details</p>
                </div>
                <hr></hr>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : (
                    <div>
                        <p><strong>Name:</strong> {paymentDetails.name}</p>
                        <p><strong>Date:</strong> {new Date(paymentDetails.date).toLocaleDateString()}</p>
                        <p><strong>Payment Type:</strong> {paymentDetails.paymentType}</p>
                        <p><strong>Amount:</strong> {paymentDetails.amount}</p>
                        <p><strong>Payment Description:</strong> {paymentDetails.paymentDescription}</p>
                    </div>
                )}
                <div className="d-grid gap-2 col-6 mx-auto">
                    <button className="btn btn-outline-primary" onClick={() => window.history.back()}>Go Back</button>
                </div>
            </div>
        </div>
    );
}
