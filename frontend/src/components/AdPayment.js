import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams hook from react-router-dom
import axios from 'axios';
import '../styles/AdPayment.css'; // Adjust the import path

export default function AdPayment() {
    const { id } = useParams(); // Use useParams hook to get the advertisement ID from the URL

    // Mock beneficiary details (replace with actual data)
    const beneficiaryDetails = {
        accountNumber: '1234567890',
        bank: 'Sample Bank',
        branch: 'Sample Branch',
        contact: '123-456-7890'
        // Add other beneficiary details here
    };

    const [payment, setPayment] = useState("");

    function handleUploadPaymentSlip(e) {
        e.preventDefault();

        const formData = new FormData();

        for (let i = 0; i < payment.length; i++) {
            formData.append("payment", payment[i]);
        }

        axios.post(`http://localhost:8070/advertisement/pay/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })        
        .then(() => {
            alert("Payment Slip Uploaded");
        })
        .catch((err) => {
            alert(err);
        });
    }

    const handleFileChange = (e) => {
        setPayment([...payment, ...Array.from(e.target.files)]);
    };


    return (
        <div className="ad-payment">
            <h2>Beneficiary Details</h2>
            <div>
                <p>Account Number: {beneficiaryDetails.accountNumber}</p>
                <p>Bank: {beneficiaryDetails.bank}</p>
                <p>Branch: {beneficiaryDetails.branch}</p>
                <p>Contact: {beneficiaryDetails.contact}</p>
                {/* Display other beneficiary details here */}
            </div>
            <hr />
            <h2>Upload Payment Slip</h2>
            {/* Input field for selecting payment slip */}
            <div className="payment-form">
                <input type="file" onChange={handleFileChange} />
                {/* Button to upload payment slip */}
                <button onClick={handleUploadPaymentSlip} className="btn btn-primary">Upload Payment Slip</button>
            </div>
        </div>
    );
}
