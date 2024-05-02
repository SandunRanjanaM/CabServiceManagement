import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import '../styles/AllAds.css';

export default function AllAds() {
    const [advertisements, setAdvertisements] = useState([]);
    const [clickCounts, setClickCounts] = useState(() => {
        const storedClickCounts = localStorage.getItem('clickCounts');
        return storedClickCounts ? JSON.parse(storedClickCounts) : {};
    });

    useEffect(() => {
        async function getAdvertisements() {
            try {
                const response = await axios.get("http://localhost:8070/advertisement/");
                setAdvertisements(response.data);
            } catch (error) {
                alert(error.message);
            }
        }
        getAdvertisements();
    }, []);

    useEffect(() => {
        localStorage.setItem('clickCounts', JSON.stringify(clickCounts));
    }, [clickCounts]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8070/advertisement/delete/${id}`);
            alert("Advertisement deleted successfully");
        } catch (error) {
            alert(error.message);
        }
    };

    const handleAdClick = (id) => {
        const updatedClickCounts = { ...clickCounts };
        updatedClickCounts[id] = (updatedClickCounts[id] || 0) + 1;
        setClickCounts(updatedClickCounts);
    };

    const generatePaymentReceipt = (advertisement) => {
        const pdf = new jsPDF();
        pdf.text("Payment Confirmation Successful", 10, 10);
        pdf.text(`Advertisement Title: ${advertisement.title}`, 10, 20);
        pdf.text(`User Email: ${advertisement.email}`, 10, 30);
        pdf.text(`Duration(in weeks): ${advertisement.duration}`, 10, 40);
        pdf.save("payment_receipt.pdf");
    };

    return (
        <div className='container1'>
            <h1>Advertisements Gallery</h1>
            <div className="card-container">
                {advertisements.map(advertisement => (
                    <div key={advertisement._id} className="card">
                        <img
                            src={`http://localhost:8070/${advertisement.content[0]}`}
                            alt={advertisement.title}
                            className={`content-image ${advertisement.status !== 'Paid' ? 'blurred' : ''}`}
                        />
                        <div className="card-body">
                            <h5 className={`card-title ${advertisement.status !== 'Paid' ? 'blurred' : ''}`}>{advertisement.title}</h5>
                            <p className={`card-text ${advertisement.status !== 'Paid' ? 'blurred' : ''}`}>{advertisement.description}</p>
                            <p className={`card-email ${advertisement.status !== 'Paid' ? 'blurred' : ''}`}>Email: {advertisement.email}</p>
                            <p className={`card-contact ${advertisement.status !== 'Paid' ? 'blurred' : ''}`}>Contact: {advertisement.contact}</p>
                            <p className={`card-status ${advertisement.status !== 'Paid'}`}>Status: {advertisement.status}</p>
                            <div className="card-buttons">
                                {advertisement.status !== "Paid" && advertisement.status !== "Pending" && (
                                    <>
                                        <Link to={`/update/${advertisement._id}`} className="btn btn-primary">Update</Link>
                                        <Link to={`/delete/${advertisement._id}`} className="btn btn-danger ml-2">Delete</Link>
                                    </>
                                )}

                                {advertisement.status === "Approved" && (
                                    <Link to={`/pay/${advertisement._id}`} className="btn btn-success ml-2" style={{ marginTop: '10px' }}>Pay</Link>
                                )}

                                {advertisement.status === "Paid" && (
                                    <>
                                        <button className="btn btn-info ml-2" onClick={() => handleAdClick(advertisement._id)} style={{ marginBottom: '10px' }}>Like : {clickCounts[advertisement._id] || 0}</button>
                                        <button className="btn btn-secondary ml-2" onClick={() => generatePaymentReceipt(advertisement)}>Download Report</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
